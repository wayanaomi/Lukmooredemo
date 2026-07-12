"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Check, MessageSquare, Package, Sparkles, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import { notifications as initialNotifications } from "@/lib/data/customer";
import { formatDateTime } from "@/lib/utils/format";
import { cn } from "@/lib/utils";
import type { NotificationItem } from "@/types/marketplace";

const typeIcons: Record<NotificationItem["type"], typeof Package> = {
  order: Package,
  promo: Sparkles,
  message: MessageSquare,
  system: Wrench,
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  function markRead(id: string) {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold">Notifications</h1>
          <p className="text-sm text-muted-foreground">
            {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <Check className="h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState icon={Bell} title="No notifications" description="You're all caught up." />
      ) : (
        <div className="flex flex-col gap-2">
          {notifications.map((notification) => {
            const Icon = typeIcons[notification.type];
            return (
              <Link
                key={notification.id}
                href={notification.href ?? "#"}
                onClick={() => markRead(notification.id)}
                className={cn(
                  "flex items-start gap-3 rounded-xl border p-4 transition-colors hover:border-brand-red/30",
                  !notification.read && "bg-brand-red/5"
                )}
              >
                <div className="bg-gradient-brand flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatDateTime(notification.createdAt)}
                  </p>
                </div>
                {!notification.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-red" />}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
