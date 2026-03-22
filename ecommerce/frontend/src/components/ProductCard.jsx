import React from "react";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

const ProductCard = ({ product }) => {
  return (
    <article className="card">
      <div className="card__image">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} />
        ) : (
          <div className="card__placeholder">No Image</div>
        )}
      </div>
      <div className="card__body">
        <h3>{product.name}</h3>
        <p className="card__price">{currency.format(product.price)}</p>
        {product.description ? (
          <p className="card__description">{product.description}</p>
        ) : (
          <p className="card__description muted">Freshly added to the catalog.</p>
        )}
      </div>
    </article>
  );
};

export default ProductCard;
