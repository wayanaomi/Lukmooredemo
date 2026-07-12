"use client";

import { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LifeBuoy, Loader2, Plus } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { EmptyState } from "@/components/shared/empty-state";
import { ScrollArea } from "@/components/ui/scroll-area";
import { supportTickets as initialTickets } from "@/lib/data/customer";
import { formatDateTime } from "@/lib/utils/format";
import { cn } from "@/lib/utils";
import type { SupportTicket } from "@/types/marketplace";
import { nanoid } from "nanoid";

const ticketSchema = z.object({
  subject: z.string().min(3, "Enter a subject"),
  category: z.string().min(1, "Select a category"),
  message: z.string().min(10, "Describe your issue in more detail"),
});
type TicketInput = z.infer<typeof ticketSchema>;

const statusStyles: Record<SupportTicket["status"], string> = {
  open: "bg-info/10 text-info border-info/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  resolved: "bg-success/10 text-success border-success/20",
  closed: "bg-muted text-muted-foreground border-border",
};

export default function SupportPage() {
  return (
    <Suspense>
      <SupportContent />
    </Suspense>
  );
}

function SupportContent() {
  const [tickets, setTickets] = useState<SupportTicket[]>(initialTickets);
  const [activeId, setActiveId] = useState(initialTickets[0]?.id);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<TicketInput>({
    resolver: zodResolver(ticketSchema),
    defaultValues: { subject: "", category: "General", message: "" },
  });

  const active = tickets.find((t) => t.id === activeId) ?? tickets[0];

  async function onSubmit(values: TicketInput) {
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const ticket: SupportTicket = {
      id: nanoid(),
      subject: values.subject,
      status: "open",
      priority: "medium",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      category: values.category,
      messages: [{ author: "You", message: values.message, createdAt: new Date().toISOString() }],
    };
    setTickets((prev) => [ticket, ...prev]);
    setActiveId(ticket.id);
    setSubmitting(false);
    setDialogOpen(false);
    form.reset();
    toast.success("Support ticket created");
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold">Support Tickets</h1>
          <p className="text-sm text-muted-foreground">Get help with orders, payments, or your account.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-brand">
              <Plus className="h-4 w-4" />
              New ticket
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create support ticket</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Briefly describe the issue" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="General">General</SelectItem>
                          <SelectItem value="Orders & Shipping">Orders & Shipping</SelectItem>
                          <SelectItem value="Returns & Refunds">Returns & Refunds</SelectItem>
                          <SelectItem value="Payments">Payments</SelectItem>
                          <SelectItem value="Account">Account</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea rows={4} placeholder="Provide as much detail as possible" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={submitting} className="bg-gradient-brand w-full">
                    {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    Submit ticket
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {tickets.length === 0 ? (
        <EmptyState icon={LifeBuoy} title="No support tickets" description="Create a ticket if you need help." />
      ) : (
        <div className="grid grid-cols-1 gap-0 overflow-hidden rounded-2xl border bg-card lg:grid-cols-[280px_1fr]">
          <ScrollArea className="h-125 border-r">
            {tickets.map((ticket) => (
              <button
                key={ticket.id}
                onClick={() => setActiveId(ticket.id)}
                className={cn(
                  "flex w-full flex-col gap-1 border-b p-4 text-left hover:bg-muted",
                  ticket.id === active?.id && "bg-muted"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium">{ticket.subject}</p>
                  <Badge variant="outline" className={cn("shrink-0 text-xs", statusStyles[ticket.status])}>
                    {ticket.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{ticket.category}</p>
              </button>
            ))}
          </ScrollArea>

          {active && (
            <div className="flex flex-col p-5">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h2 className="font-heading font-semibold">{active.subject}</h2>
                  <p className="text-xs text-muted-foreground">
                    {active.category} · Opened {formatDateTime(active.createdAt)}
                  </p>
                </div>
                <Badge variant="outline" className={statusStyles[active.status]}>
                  {active.status}
                </Badge>
              </div>
              <div className="mt-4 flex flex-col gap-3">
                {active.messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                      message.author === "You" ? "bg-gradient-brand ml-auto text-white" : "bg-muted"
                    )}
                  >
                    <p className="text-xs font-semibold opacity-80">{message.author}</p>
                    <p>{message.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
