// src/app/profile/orders/_hooks/useOrders.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getOrders,
  getCurrentOrders,
  getDeliveredOrders,
  getReturnedOrders,
  getOrderStatusCounts,
} from "../_services/orders.api";
import { OrderAPI, OrderStatusCounts } from "../_types/order.types";

interface UseOrdersReturn {
  // State
  orders: OrderAPI[];
  currentOrders: OrderAPI[];
  deliveredOrders: OrderAPI[];
  returnedOrders: OrderAPI[];
  statusCounts: OrderStatusCounts;
  isLoading: boolean;
  error: string | null;
  
  // Pagination
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
  
  // Actions
  fetchOrders: (page?: number, limit?: number) => Promise<void>;
  fetchCurrentOrders: (page?: number, limit?: number) => Promise<void>;
  fetchDeliveredOrders: (page?: number, limit?: number) => Promise<void>;
  fetchReturnedOrders: (page?: number, limit?: number) => Promise<void>;
  fetchStatusCounts: () => Promise<void>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useOrders(initialLimit = 10): UseOrdersReturn {
  const [orders, setOrders] = useState<OrderAPI[]>([]);
  const [currentOrders, setCurrentOrders] = useState<OrderAPI[]>([]);
  const [deliveredOrders, setDeliveredOrders] = useState<OrderAPI[]>([]);
  const [returnedOrders, setReturnedOrders] = useState<OrderAPI[]>([]);
  const [statusCounts, setStatusCounts] = useState<OrderStatusCounts>({
    current: 0,
    delivered: 0,
    returned: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialLimit);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  // دریافت تمام سفارش‌ها
  const fetchOrders = useCallback(async (newPage?: number, newLimit?: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const currentPage = newPage || page;
      const currentLimit = newLimit || limit;
      
      const response = await getOrders(currentPage, currentLimit);
      
      if (newPage === 1) {
        setOrders(response.data);
      } else {
        setOrders(prev => [...prev, ...response.data]);
      }
      
      setTotal(response.meta.total);
      setHasMore(response.meta.hasMore);
      setPage(currentPage);
      setLimit(currentLimit);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در دریافت سفارش‌ها');
    } finally {
      setIsLoading(false);
    }
  }, [page, limit]);

  // دریافت سفارش‌های جاری
  const fetchCurrentOrders = useCallback(async (newPage?: number, newLimit?: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const currentPage = newPage || 1;
      const currentLimit = newLimit || limit;
      
      const response = await getCurrentOrders(currentPage, currentLimit);
      
      if (newPage === 1 || !newPage) {
        setCurrentOrders(response.data);
      } else {
        setCurrentOrders(prev => [...prev, ...response.data]);
      }
      
      setTotal(response.meta.total);
      setHasMore(response.meta.hasMore);
      setPage(currentPage);
      setLimit(currentLimit);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در دریافت سفارش‌های جاری');
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  // دریافت سفارش‌های تحویل شده
  const fetchDeliveredOrders = useCallback(async (newPage?: number, newLimit?: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const currentPage = newPage || 1;
      const currentLimit = newLimit || limit;
      
      const response = await getDeliveredOrders(currentPage, currentLimit);
      
      if (newPage === 1 || !newPage) {
        setDeliveredOrders(response.data);
      } else {
        setDeliveredOrders(prev => [...prev, ...response.data]);
      }
      
      setTotal(response.meta.total);
      setHasMore(response.meta.hasMore);
      setPage(currentPage);
      setLimit(currentLimit);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در دریافت سفارش‌های تحویل شده');
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  // دریافت سفارش‌های مرجوع شده
  const fetchReturnedOrders = useCallback(async (newPage?: number, newLimit?: number) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const currentPage = newPage || 1;
      const currentLimit = newLimit || limit;
      
      const response = await getReturnedOrders(currentPage, currentLimit);
      
      if (newPage === 1 || !newPage) {
        setReturnedOrders(response.data);
      } else {
        setReturnedOrders(prev => [...prev, ...response.data]);
      }
      
      setTotal(response.meta.total);
      setHasMore(response.meta.hasMore);
      setPage(currentPage);
      setLimit(currentLimit);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطا در دریافت سفارش‌های مرجوع شده');
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  // دریافت تعداد سفارش‌ها بر اساس وضعیت
  const fetchStatusCounts = useCallback(async () => {
    try {
      const counts = await getOrderStatusCounts();
      setStatusCounts(counts);
    } catch (err) {
      console.error('خطا در دریافت تعداد سفارش‌ها:', err);
    }
  }, []);

  // بارگذاری بیشتر
  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading) return;
    
    const nextPage = page + 1;
    
    // بر اساس وضعیت فعال، سفارش‌های مربوطه را بارگذاری کن
    // اینجا می‌توانی منطق دلخواه خودت را پیاده‌سازی کنی
    await fetchOrders(nextPage);
  }, [hasMore, isLoading, page, fetchOrders]);

  // رفرش
  const refresh = useCallback(async () => {
    await Promise.all([
      fetchOrders(1),
      fetchStatusCounts(),
    ]);
  }, [fetchOrders, fetchStatusCounts]);

  // بارگذاری اولیه
  useEffect(() => {
    refresh();
  }, []);

  return {
    // State
    orders,
    currentOrders,
    deliveredOrders,
    returnedOrders,
    statusCounts,
    isLoading,
    error,
    
    // Pagination
    page,
    limit,
    total,
    hasMore,
    
    // Actions
    fetchOrders,
    fetchCurrentOrders,
    fetchDeliveredOrders,
    fetchReturnedOrders,
    fetchStatusCounts,
    loadMore,
    refresh,
  };
}