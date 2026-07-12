"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const profileSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
});
type ProfileInput = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    values: {
      name: session?.user?.name ?? "",
      email: session?.user?.email ?? "",
      phone: "",
    },
  });

  async function onSubmit() {
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSubmitting(false);
    toast.success("Profile updated");
  }

  const initials = session?.user?.name?.slice(0, 2).toUpperCase() ?? "U";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl font-bold">Profile</h1>
        <p className="text-sm text-muted-foreground">Manage your personal information.</p>
      </div>

      <div className="rounded-2xl border bg-card p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-16 w-16">
              <AvatarImage src={session?.user?.image ?? undefined} alt={session?.user?.name ?? "Account"} />
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <button
              type="button"
              className="bg-gradient-brand absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-card"
              onClick={() => toast.info("Avatar upload coming soon")}
            >
              <Camera className="h-3 w-3 text-white" />
            </button>
          </div>
          <div>
            <p className="font-semibold">{session?.user?.name}</p>
            <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4 sm:max-w-md">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+234 800 000 0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={submitting} className="bg-gradient-brand w-fit">
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Save changes
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
