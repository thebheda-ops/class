const API_BASE = "http://localhost:5000";

export const fetchProducts = async () => {
  const res = await fetch(`${API_BASE}/api/products`);
  if (!res.ok) {
    throw new Error("Failed to load products");
  }
  return res.json();
};

export const createProduct = async (payload) => {
  const res = await fetch(`${API_BASE}/api/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "Failed to create product");
  }

  return res.json();
};
