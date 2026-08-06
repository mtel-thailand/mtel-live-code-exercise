// In-memory "database" for the exercise.
// The artificial latency below simulates a real network/DB round-trip and is
// what makes the search feel realistic. Do not remove it.

const categories = [
  { id: 1, name: 'Laptops' },
  { id: 2, name: 'Phones' },
  { id: 3, name: 'Audio' },
  { id: 4, name: 'Accessories' },
];

const products = [
  { id: 1, name: 'ProBook 14', price: 1299, categoryId: 1, stock: 12 },
  { id: 2, name: 'ProBook 16', price: 1699, categoryId: 1, stock: 5 },
  { id: 3, name: 'AirLite 13', price: 999, categoryId: 1, stock: 20 },
  { id: 4, name: 'Pixel Mini', price: 599, categoryId: 2, stock: 33 },
  { id: 5, name: 'Pixel Max', price: 899, categoryId: 2, stock: 8 },
  { id: 6, name: 'Nova 5', price: 449, categoryId: 2, stock: 41 },
  { id: 7, name: 'SoundBuds Pro', price: 149, categoryId: 3, stock: 60 },
  { id: 8, name: 'SoundBar 200', price: 249, categoryId: 3, stock: 15 },
  { id: 9, name: 'Studio Headphones', price: 329, categoryId: 3, stock: 9 },
  { id: 10, name: 'USB-C Hub', price: 59, categoryId: 4, stock: 120 },
  { id: 11, name: 'Wireless Mouse', price: 39, categoryId: 4, stock: 200 },
  { id: 12, name: 'Mechanical Keyboard', price: 119, categoryId: 4, stock: 45 },
  { id: 13, name: 'Laptop Stand', price: 49, categoryId: 4, stock: 75 },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Simulates a search query hitting the DB.
// NOTE: broader queries (fewer characters -> more matches) take LONGER,
// exactly like a real full-text search returning a larger result set.
async function searchProducts(query) {
  const q = String(query || '').toLowerCase();
  const results = products.filter((p) => p.name.toLowerCase().includes(q));
  console.log("🚀 ~ searchProducts ~ q:", q, results)
  await sleep(150 + results.length * 70);
  return results;
}

// Simulates fetching a single category row by id (one round-trip each).
async function getCategoryById(id) {
  await sleep(40);
  return categories.find((c) => c.id === id);
}

// Batch lookup: fetch many categories in a single round-trip.
async function getCategoriesByIds(ids) {
  await sleep(40);
  const set = new Set(ids);
  return categories.filter((c) => set.has(c.id));
}

// Fetch all categories in a single round-trip.
async function getAllCategories() {
  await sleep(40);
  return categories.slice();
}

module.exports = {
  searchProducts,
  getCategoryById,
  getCategoriesByIds,
  getAllCategories,
};
