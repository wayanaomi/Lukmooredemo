"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Package, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/shared/empty-state";
import { vendorProducts as initialProducts } from "@/lib/data/vendor-dashboard";
import { formatCurrency } from "@/lib/utils/format";
import type { Product } from "@/types/marketplace";

const productSchema = z.object({
  title: z.string().min(3, "Enter a product title"),
  price: z.coerce.number().min(0.01, "Enter a valid price"),
  stock: z.coerce.number().min(0, "Enter valid stock"),
});
type ProductFormInput = z.input<typeof productSchema>;
type ProductFormOutput = z.output<typeof productSchema>;

export default function VendorProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<ProductFormInput, unknown, ProductFormOutput>({
    resolver: zodResolver(productSchema),
    defaultValues: { title: "", price: 0, stock: 0 },
  });

  function openNew() {
    setEditing(null);
    form.reset({ title: "", price: 0, stock: 0 });
    setDialogOpen(true);
  }

  function openEdit(product: Product) {
    setEditing(product);
    form.reset({ title: product.title, price: product.price, stock: product.stock });
    setDialogOpen(true);
  }

  function handleDelete(id: string) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product removed");
  }

  async function onSubmit(values: ProductFormOutput) {
    setSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (editing) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editing.id ? { ...p, ...values } : p))
      );
      toast.success("Product updated");
    } else {
      const newProduct: Product = {
        ...initialProducts[0],
        id: `custom-${Date.now()}`,
        slug: `custom-${Date.now()}`,
        title: values.title,
        price: values.price,
        stock: values.stock,
      };
      setProducts((prev) => [newProduct, ...prev]);
      toast.success("Product added");
    }
    setSubmitting(false);
    setDialogOpen(false);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold">Products</h1>
          <p className="text-sm text-muted-foreground">Manage your store&apos;s product catalog.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-brand" onClick={openNew}>
              <Plus className="h-4 w-4" />
              Add product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit product" : "Add new product"}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (₦)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            name={field.name}
                            ref={field.ref}
                            onBlur={field.onBlur}
                            value={typeof field.value === "number" ? field.value : ""}
                            onChange={(event) => field.onChange(event.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            name={field.name}
                            ref={field.ref}
                            onBlur={field.onBlur}
                            value={typeof field.value === "number" ? field.value : ""}
                            onChange={(event) => field.onChange(event.target.value)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={submitting} className="bg-gradient-brand w-full">
                    {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                    {editing ? "Save changes" : "Add product"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {products.length === 0 ? (
        <EmptyState icon={Package} title="No products yet" description="Add your first product to start selling." />
      ) : (
        <div className="rounded-2xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Sold</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                  <TableCell>{formatCurrency(product.price)}</TableCell>
                  <TableCell className={product.stock < 10 ? "text-destructive font-medium" : ""}>
                    {product.stock}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{product.soldCount}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={product.stock > 0 ? "border-success/20 bg-success/10 text-success" : "border-destructive/20 bg-destructive/10 text-destructive"}>
                      {product.stock > 0 ? "Active" : "Out of stock"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="icon-sm" variant="ghost" onClick={() => openEdit(product)}>
                      <Pencil className="h-3.5 w-3.5" />
                    </Button>
                    <Button size="icon-sm" variant="ghost" className="text-destructive" onClick={() => handleDelete(product.id)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
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
