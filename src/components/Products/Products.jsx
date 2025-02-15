import Product from "./Product";
import React, { memo } from "react";

const MenProducts = memo(function MenProducts({ list }) {
  return (
    <div className="grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:flex flex-wrap gap-3 lg:gap-9 p-2 justify-center">
      {list.map((item) => (
        <Product data={item} key={item.id} />
      ))}
    </div>
  );
});

const WomenProducts = memo(function WomenProducts({ list }) {
  return (
    <div className="grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:flex flex-wrap gap-3 lg:gap-9 p-2 justify-center">
      {list.map((item) => (
        <Product data={item} key={item.id} />
      ))}
    </div>
  );
});

const KidsProducts = memo(function KidsProducts({ list }) {
  return (
    <div className="grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:flex flex-wrap gap-3 lg:gap-9 p-2 justify-center">
      {list.map((item) => (
        <Product data={item} key={item.id} />
      ))}
    </div>
  );
});

export { MenProducts, WomenProducts, KidsProducts };
