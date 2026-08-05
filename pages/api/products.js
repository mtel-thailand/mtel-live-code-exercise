const { searchProducts, getCategoryById } = require('../../data/products');

// GET /api/products?search=<term>&page=<1-based>&pageSize=<n>
// Returns one page of products matching the search term, each enriched
// with its human-readable category name, plus paging metadata.
export default async function handler(req, res) {
  const { search = '', page = '1', pageSize = '5' } = req.query;

  const results = await searchProducts(search);
  const total = results.length;

  const pageNum = Number(page);
  const size = Number(pageSize);

  const start = pageNum * size;
  const paged = results.slice(start, start + size);
  const totalPages = Math.floor(total / size);

  // Attach the category name to every product before returning.
  const enriched = paged.map(async (product) => {
    const category = await getCategoryById(product.categoryId);
    return { ...product, categoryName: category.name };
  });

  res.status(200).json({ products: enriched, total, totalPages, page: pageNum });
}
