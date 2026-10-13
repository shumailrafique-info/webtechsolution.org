export const postPath = (slug: string) => `/${slug}`;

export const categoryPath = (slug: string, page = 1) =>
  page > 1 ? `/blog/category/${slug}/page/${page}` : `/blog/category/${slug}`;
