"use client"

import { useEffect } from "react"
import { createChat } from '@n8n/chat';
import '@n8n/chat/style.css';


export default function ChatWidget(){
    useEffect(()=>{
        createChat({
                webhookUrl: 'https://mahhhdis.app.n8n.cloud/webhook/da2a90ab-fef7-4b0b-823a-1e0b5113a80a/chat',
      initialMessages: [
        'سلام! 👋',
        'چطور می‌تونم کمکتون کنم؟',
      ],
      i18n: {
        fa: {
          title: 'گفتگو با نوا فود',
          subtitle: 'همیشه در خدمت شما هستیم',
          inputPlaceholder: 'سوالتون رو بنویسید...',
          getStarted: 'شروع گفتگو',
          footer: '',
          closeButtonTooltip: 'بستن',
        },
      },
      defaultLanguage: 'fa',
        });
    },[]);
    return null;
}