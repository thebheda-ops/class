import React, { useEffect, useState } from "react";
import { createProduct, fetchProducts } from "./api.js";
import ProductCard from "./components/ProductCard.jsx";

const initialForm = {
  name: "",
  price: "",
  imageUrl: "",
  description: ""
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    try {
      const payload = {
        name: form.name.trim(),
        price: Number(form.price),
        imageUrl: form.imageUrl.trim(),
        description: form.description.trim()
      };

      if (!payload.name || Number.isNaN(payload.price)) {
        throw new Error("Name and price are required.");
      }

      const created = await createProduct(payload);
      setProducts((prev) => [created, ...prev]);
      setForm(initialForm);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page">
      <header className="hero">
        <div>
          <p className="eyebrow">NovaCart</p>
          <h1>Launch your next storefront in minutes.</h1>
          <p className="subtitle">
            A tiny MERN demo with MongoDB + Express + React + Node. Add products
            below and watch the catalog update live.
          </p>
        </div>
        <div className="stats">
          <div>
            <span className="stat__label">Products</span>
            <span className="stat__value">{products.length}</span>
          </div>
          <div>
            <span className="stat__label">Status</span>
            <span className="stat__value">{loading ? "Loading" : "Ready"}</span>
          </div>
        </div>
      </header>

      <section className="panel">
        <h2>Add a product</h2>
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Product name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Midnight Hoodie"
              required
            />
          </label>
          <label>
            Price (USD)
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="89"
              type="number"
              min="0"
              step="0.01"
              required
            />
          </label>
          <label>
            Image URL
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              placeholder="https://"
            />
          </label>
          <label>
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Limited drop with a soft brushed interior."
              rows="3"
            />
          </label>
          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Add product"}
          </button>
        </form>
        {error ? <p className="error">{error}</p> : null}
      </section>

      <section className="catalog">
        <div className="catalog__header">
          <h2>Featured products</h2>
          <button className="ghost" onClick={loadProducts} disabled={loading}>
            Refresh
          </button>
        </div>
        {loading ? (
          <p className="muted">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="muted">No products yet. Add the first one above.</p>
        ) : (
          <div className="grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default App;
