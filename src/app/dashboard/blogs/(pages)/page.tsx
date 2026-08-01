"use client";

import { DashboardContainer } from "@/src/shared/components/dashboard-container";
import { DashboardMain } from "@/src/shared/components/dashboard-main";
import { DashboardSidebar } from "@/src/shared/components/dashboard-sidebar";
import { DefaultButton, Subtitle, Text } from "@/src/shared/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AddBlogModal } from "../_components/add-blog-modal";
import { BlogsTable } from "../_components/blogs-table";
import { ConfirmModal } from "../_components/confirm-modal";
import { useDashboardBlogs } from "../_hooks/useDashboardBlogs";
import { deleteBlog } from "../_services/blog.api";

export default function DashboardBlog() {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    slug: string | null;
  }>({
    isOpen: false,
    slug: null,
  });
  const [page, setPage] = useState(1);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { data, isLoading, error, refetch } = useDashboardBlogs(page, 10);
  const blogs = data?.data || [];

  const BLOG_STATS = [
    { label: " بازدید", value: "6362", color: "danger" },
    { label: "بلاگ جدید", value: "89", color: undefined },
    { label: "سیو کردند", value: "77", color: undefined },
    { label: "پسندیده", value: "97", color: undefined },
  ];

  // ===== توابع انتخاب =====
  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === blogs.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(blogs.map((b) => b.id));
    }
  };

  const isAllSelected = blogs.length > 0 && selectedIds.length === blogs.length;

  // ===== تابع حذف گروهی =====
  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    setIsDeleting(true);
    try {
      const deletePromises = selectedIds.map(async (id) => {
        const blog = blogs.find((b) => b.id === id);
        if (!blog) return null;
        return deleteBlog(blog.slug);
      });
      const results = await Promise.all(deletePromises);
      const failedCount = results.filter(
        (r) => r === null || r?.success === false,
      ).length;
      if (failedCount === 0) {
        console.log("successfully deleted");
      } else {
        console.log("unsuccessful deletion");
      }
      setSelectedIds([]);
      await refetch();
    } catch (error) {
      console.error("❌ خطا در حذف گروهی:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // ===== توابع باز و بستن مودال‌ها =====
  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const openEditModal = (slug: string) => setEditModal({ isOpen: true, slug });
  const closeEditModal = () => setEditModal({ isOpen: false, slug: null });

  // ===== وضعیت‌های بارگذاری و خطا =====
  if (isLoading) {
    return (
      <DashboardContainer>
        <DashboardSidebar>
          <div className="flex h-auto w-full flex-col gap-5 pt-25">
            <div className="flex h-40 items-center justify-center">
              در حال بارگذاری...
            </div>
          </div>
        </DashboardSidebar>
        <DashboardMain>
          <div className="flex h-40 items-center justify-center">
            در حال بارگذاری...
          </div>
        </DashboardMain>
      </DashboardContainer>
    );
  }

  if (error) {
    return (
      <DashboardContainer>
        <DashboardSidebar>
          <div className="flex h-auto w-full flex-col gap-5 pt-25">
            {/* ... */}
          </div>
        </DashboardSidebar>
        <DashboardMain>
          <div className="flex h-40 items-center justify-center text-red-500">
            خطا در دریافت بلاگ‌ها: {error.message}
          </div>
        </DashboardMain>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer>
      <DashboardSidebar>
        <div className="flex h-auto w-full flex-col gap-5 pt-25">
          {/* دکمه افزودن بلاگ */}
          <div className="flex w-full flex-row items-center justify-between rounded-sm bg-pure-white py-2 pr-4 pl-2 shadow-xl">
            <Text text="اضافه کردن بلاگ " weight="bold" size="lg" />
            <div
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-sm bg-primary shadow-xl"
              onClick={openCreateModal}
            >
            </div>
          </div>

          {/* کارت وضعیت بلاگ‌ها */}
          <div className="flex h-auto w-full flex-col rounded-sm bg-pure-white shadow-xl">
            <div className="border-b-2 border-accent px-4 py-4">
              <Text
                text="وضعیت بلاگ ها"
                size="lg"
                color="secondary"
                weight="bold"
              />
            </div>
            <div className="flex flex-col gap-2 px-4 py-4">
              {BLOG_STATS.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center justify-between"
                >
                  <Text text={stat.label} size="sm" weight="regular" />
                  <Subtitle
                    text={stat.value}
                    size="2xl"
                    color={(stat.color as any) || "primary"}
                    weight="bold"
                  />
                </div>
              ))}
              <div className="h-0.5 bg-accent"></div>
            </div>
            <div className="px-10 pb-4">
              <DefaultButton
                label="انتقال به صفحه بلاگ"
                style="outline"
                type="secondary"
                action={() => router.push("/blogs")}
              />
            </div>
          </div>
        </div>
      </DashboardSidebar>

      <DashboardMain>
        {/* نوار ابزار */}
        <div className="flex h-19.5 flex-row items-end justify-end gap-2">
          <div className="flex flex-row items-center">
            <button
              onClick={() => setDeleteModalOpen(true)}
              disabled={selectedIds.length === 0 || isDeleting}
              className={`rounded-sm p-2 transition-colors ${
                selectedIds.length === 0 || isDeleting
                  ? "opacity-50"
                  : "cursor-pointer"
              }`}
            >
              {isDeleting ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-danger" />
              ) : (<></>
              )}
            </button>
            <div className="cursor-pointer" onClick={toggleSelectAll}>
              {isAllSelected ? (<></>
              ) : (<></>
              )}
            </div>
          </div>
        </div>

        {/* جدول */}
        <div className="h-auto w-full overflow-x-auto rounded-xs border-2 border-accent">
          <BlogsTable
            blogs={blogs}
            selectedIds={selectedIds}
            onToggleSelect={toggleSelect}
            onEdit={openEditModal}
          />
        </div>
      </DashboardMain>

      {/* مودال ایجاد */}
      <AddBlogModal
        isOpen={isCreateModalOpen}
        onClose={closeCreateModal}
        mode="create"
        onAddBlog={() => refetch()}
      />

      {/* مودال ویرایش */}
      {editModal.isOpen && editModal.slug && (
        <AddBlogModal
          isOpen={editModal.isOpen}
          onClose={closeEditModal}
          mode="update"
          blogSlug={editModal.slug}
          onUpdateBlog={() => {
            refetch();
            closeEditModal();
          }}
        />
      )}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="حذف گروهی"
        message={`آیا از حذف ${selectedIds.length} بلاگ انتخاب‌شده مطمئن هستید؟`}
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={async () => {
          await handleDeleteSelected();
          setDeleteModalOpen(false);
        }}
        isLoading={isDeleting}
      />
    </DashboardContainer>
  );
}
