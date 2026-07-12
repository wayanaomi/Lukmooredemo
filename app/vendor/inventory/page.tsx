"use client";

import { useState } from "react";
import Image from "next/image";
import { Boxes, Minus, Plus } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/shared/empty-state";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { vendorProducts as initialProducts } from "@/lib/data/vendor-dashboard";

export default function InventoryPage() {
  const [products, setProducts] = useState(initialProducts);

  function adjustStock(id: string, delta: number) {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p))
    );
  }

  function handleSave() {
    toast.success("Inventory updated");
  }

  const lowStockCount = products.filter((p) => p.stock > 0 && p.stock < 10).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold">Inventory</h1>
          <p className="text-sm text-muted-foreground">
            {lowStockCount} product{lowStockCount !== 1 ? "s" : ""} running low on stock.
          </p>
        </div>
        <Button onClick={handleSave} className="bg-gradient-brand">
          Save changes
        </Button>
      </div>

      {products.length === 0 ? (
        <EmptyState icon={Boxes} title="No inventory to track" description="Add products to manage stock levels." />
      ) : (
        <div className="rounded-2xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
                      </div>
                      <span className="max-w-[220px] truncate text-sm font-medium">{product.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {product.id.slice(0, 8).toUpperCase()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="icon-xs" variant="outline" onClick={() => adjustStock(product.id, -1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">{product.stock}</span>
                      <Button size="icon-xs" variant="outline" onClick={() => adjustStock(product.id, 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    {product.stock === 0 ? (
                      <Badge variant="outline" className="border-destructive/20 bg-destructive/10 text-destructive">
                        Out of stock
                      </Badge>
                    ) : product.stock < 10 ? (
                      <Badge variant="outline" className="border-warning/20 bg-warning/10 text-warning">
                        Low stock
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-success/20 bg-success/10 text-success">
                        In stock
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
