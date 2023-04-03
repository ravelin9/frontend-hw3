export const endpoints = {
  baseUrl: "https://api.escuelajs.co/api/v1/",
  categories: "categories",
  related: (categoryId: number) => `products/?categoryId=${categoryId}`,
  products: (
    searchQuery: string,
    selectedCategory: string,
    currentPage: number
  ) => {
    const query = new URLSearchParams({
      title: searchQuery,
      categoryId: String(selectedCategory),
      page: String(currentPage),
    });
    return `products/?${query.toString()}`;
  },
  product: (id: number) => `products/${id}`,
};
