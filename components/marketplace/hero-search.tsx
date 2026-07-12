"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!query.trim()) {
      router.push("/marketplace");
      return;
    }
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel flex w-full max-w-md rounded-full p-1.5 shadow-brand-sm">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search for anything…"
          className="h-11 rounded-full border-0 bg-transparent pl-10 shadow-none focus-visible:ring-0"
          aria-label="Search products"
        />
      </div>
      <Button type="submit" className="h-11 shrink-0 rounded-full px-6 shadow-brand-sm">
        Search
      </Button>
    </form>
  );
}
