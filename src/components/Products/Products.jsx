import Product from "./Product";
import React, { memo } from "react";

const MenProducts = memo(function MenProducts({ list }) {
  return (
    <div className="products-wrapper">
      {list.map((item) => (
        <Product data={item} key={item.id} />
      ))}
    </div>
  );
});

const WomenProducts = memo(function WomenProducts({ list }) {
  return (
    <div className="products-wrapper">
      {list.map((item) => (
        <Product data={item} key={item.id} />
      ))}
    </div>
  );
});

const KidsProducts = memo(function KidsProducts({ list }) {
  return (
    <div className="products-wrapper">
      {list.map((item) => (
        <Product data={item} key={item.id} />
      ))}
    </div>
  );
});

export { MenProducts, WomenProducts, KidsProducts };
