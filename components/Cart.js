export default function Cart({ items, onUpdateQty, onRemove }) {
  const totalItems = items.reduce((count, item) => count + item.qty, 0);
  const grandTotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  console.log("items", items);
  return (
    <aside className="cart">
      <h2>Cart</h2>

      {items.length === 0 && <p className="empty">Your cart is empty.</p>}

      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-row">
            <span className="cart-name">{item.name}</span>
            <input
              className="qty"
              type="number"
              min="1"
              value={item.qty}
              disabled={item.stock === 0}
              onChange={(e) => onUpdateQty(item.id, e.target.value)}
            />
            <span className="cart-subtotal">${item.price * item.qty}</span>
            <button className="remove" onClick={() => onRemove(item.id)}>
              ×
            </button>
          </li>
        ))}
      </ul>

      {items.length > 0 && (
        <div className="cart-footer">
          <span>Total items: {totalItems}</span>
          <span>Grand total: ${grandTotal}</span>
        </div>
      )}
    </aside>
  );
}
