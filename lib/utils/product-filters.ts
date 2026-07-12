import type { Product } from "@/types/marketplace";

export interface ProductQueryParams {
  categories?: string;
  min?: string;
  max?: string;
  rating?: string;
  freeShipping?: string;
  sale?: string;
  sort?: string;
  q?: string;
}

export function filterAndSortProducts(products: Product[], params: ProductQueryParams) {
  let result = [...products];

  if (params.categories) {
    const cats = params.categories.split(",").filter(Boolean);
    if (cats.length > 0) {
      result = result.filter((product) => cats.includes(product.categorySlug));
    }
  }

  if (params.min) {
    result = result.filter((product) => product.price >= Number(params.min));
  }

  if (params.max) {
    result = result.filter((product) => product.price <= Number(params.max));
  }

  if (params.rating) {
    result = result.filter((product) => product.rating >= Number(params.rating));
  }

  if (params.freeShipping === "1") {
    result = result.filter((product) => product.freeShipping);
  }

  if (params.sale === "1") {
    result = result.filter((product) => Boolean(product.compareAtPrice));
  }

  if (params.q) {
    const query = params.q.toLowerCase();
    result = result.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        product.vendorName.toLowerCase().includes(query)
    );
  }

  switch (params.sort) {
    case "newest":
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case "best-selling":
      result.sort((a, b) => b.soldCount - a.soldCount);
      break;
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    default:
      break;
  }

  return result;
}
