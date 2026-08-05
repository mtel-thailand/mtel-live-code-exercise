# Product Catalog — Debug & Improve Exercise

A small Next.js app: a searchable, paginated product catalog with a shopping
cart. It worked in an earlier version, but a number of defects have since been
introduced. Users report that the product list, the search, and the cart do not
always behave the way the acceptance criteria below describe.

Your task, roughly in this order:

1. **Debug** — run the app, find where the behaviour differs from the
   acceptance criteria, work out the root causes, and fix them. Talk through
   your process; we care as much about *how* you debug as about the final fix.
2. **Improve** — once it works, we'll pick one thing to refactor or harden
   together, and write a test that would have caught one of these regressions.
3. **Review** — tell us what else you'd flag if this came to you as a PR, and
   which things are "must fix" vs "nice to have."

## Run it

Requires Node.js 20 LTS.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Acceptance criteria

This is the spec the app is meant to satisfy. Not all of it currently holds.

### Catalog

1. Every product in the data set is reachable by paging through the list, 5 per
   page. Page 1 starts at the first product in the data set.
2. The page indicator shows the correct number of pages for the current result
   set, including a final partial page.
3. "Prev" is disabled on the first page, "Next" on the last.
4. Each row shows the product's name, its category **name** (not its id), the
   stock figure, and the price.

### Search

5. The list filters by product name as the user types, case-insensitively.
6. Once the user stops typing, the list on screen always matches the current
   contents of the search box.
7. Changing the search term returns the user to page 1.

### Cart

8. "Add" puts the product in the cart with a quantity of 1; adding a product
   that is already in the cart increases its quantity by 1 instead.
9. Adding several different products in quick succession adds all of them.
10. The quantity of a cart line is editable, and is always a whole number of at
    least 1, and never more than that product's available stock.
11. "Total items" is the sum of the quantities in the cart; "Grand total" is the
    sum of price × quantity across all lines.
12. Removing a line removes it from the cart and from both totals.

## Where to look

- `pages/index.js` — the catalog page: search, pagination, add-to-cart (frontend)
- `components/Cart.js` — the cart panel and its totals (frontend)
- `pages/api/products.js` — the search + pagination API (backend)
- `data/products.js` — the mock data source (you should not need to change this)

## Ground rules

- Use your editor, browser devtools, the docs, and AI assistants as you normally
  would. If you use an AI assistant, keep it visible on screen — we're
  interested in how you work with it — and be ready to explain and justify any
  change you accept from it.
- Expect to demonstrate that a fix actually works, so keep the app open in a
  browser next to your editor.
- There is more than one thing worth fixing, and the acceptance criteria are not
  in priority order. Prioritize as you see fit, and say why.
