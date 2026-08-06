import { useEffect, useState } from 'react';
import Cart from '../components/Cart';

const PAGE_SIZE = 5;

export default function Home() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);

  // Reset to the first page whenever the search term changes.
  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    fetch(
      `/api/products?search=${encodeURIComponent(query)}&page=${page}&pageSize=${PAGE_SIZE}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setTotalPages(data.totalPages);
        setLoading(false);
      });
  }, [query, page]);

  const addToCart = async (product) => {
    // Simulate reserving stock on the server before adding to the cart.
    await new Promise((resolve) => setTimeout(resolve, 300));

    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const updateQty = (id, qty) =>
    setCart(cart.map((item) => (item.id === id ? { ...item, qty } : item)));

  const removeItem = (id) =>
    setCart(cart.filter((item) => item.id !== id));

  return (
    <main className="page">
      <div className="catalog">
        <h1>Product Catalog</h1>
        <p className="hint">Search updates as you type.</p>

        <input
          className="search"
          type="text"
          placeholder="Search products…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />

        <div className="meta">
          <span>{loading ? 'Loading…' : `${products.length} shown`}</span>
          <span className="query-echo">
            {query ? `for “${query}”` : 'showing all products'}
          </span>
        </div>

        <ul className="list">
          {products.map((product) => (
            <li key={product.id} className="row">
              <span className="name">{product.name}</span>
              <span className="category">{product.categoryName}</span>
              <span className="stock">{product.stock} in stock</span>
              <span className="price">${product.price}</span>
              <button className="add" onClick={() => addToCart(product)}>
                Add
              </button>
            </li>
          ))}
        </ul>

        <div className="pager">
          <button
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ‹ Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next ›
          </button>
        </div>
      </div>

      <Cart items={cart} onUpdateQty={updateQty} onRemove={removeItem} />
    </main>
  );
}
