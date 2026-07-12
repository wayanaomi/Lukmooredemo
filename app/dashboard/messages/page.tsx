"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Send } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { conversations } from "@/lib/data/customer";
import { formatDateTime } from "@/lib/utils/format";
import { cn } from "@/lib/utils";

export default function MessagesPage() {
  return (
    <Suspense>
      <MessagesContent />
    </Suspense>
  );
}

function MessagesContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("conv") ?? conversations[0]?.id;
  const [activeId, setActiveId] = useState(initialId);
  const [draft, setDraft] = useState("");

  const active = conversations.find((c) => c.id === activeId) ?? conversations[0];

  return (
    <div className="flex h-[calc(100vh-140px)] gap-0 overflow-hidden rounded-2xl border bg-card">
      <div className="w-full max-w-xs shrink-0 border-r">
        <div className="border-b p-4">
          <h1 className="font-heading font-semibold">Messages</h1>
        </div>
        <ScrollArea className="h-[calc(100%-57px)]">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => setActiveId(conv.id)}
              className={cn(
                "flex w-full items-start gap-3 border-b p-4 text-left transition-colors hover:bg-muted",
                conv.id === active?.id && "bg-muted"
              )}
            >
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted">
                {conv.participantAvatar && (
                  <Image src={conv.participantAvatar} alt={conv.participantName} fill />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium">{conv.participantName}</p>
                  {conv.unreadCount > 0 && (
                    <span className="bg-brand-red flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full px-1 text-[10px] font-bold text-white">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
                <p className="truncate text-xs text-muted-foreground">{conv.lastMessage}</p>
              </div>
            </button>
          ))}
        </ScrollArea>
      </div>

      {active && (
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-3 border-b p-4">
            <div className="relative h-9 w-9 overflow-hidden rounded-full bg-muted">
              {active.participantAvatar && (
                <Image src={active.participantAvatar} alt={active.participantName} fill />
              )}
            </div>
            <p className="font-medium">{active.participantName}</p>
          </div>

          <ScrollArea className="flex-1 p-4">
            <div className="flex flex-col gap-3">
              {active.messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-2 text-sm",
                    message.senderId === "me"
                      ? "bg-gradient-brand ml-auto text-white"
                      : "bg-muted"
                  )}
                >
                  <p>{message.message}</p>
                  <p
                    className={cn(
                      "mt-1 text-[10px]",
                      message.senderId === "me" ? "text-white/70" : "text-muted-foreground"
                    )}
                  >
                    {formatDateTime(message.createdAt)}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDraft("");
            }}
            className="flex items-center gap-2 border-t p-3"
          >
            <Input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button type="submit" size="icon" className="bg-gradient-brand" disabled={!draft.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
