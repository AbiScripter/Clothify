import Product from "./Product";

export function MenProducts({ list }) {
  console.log(list);

  return (
    <div className="products-wrapper">
      {list.map((item) => (
        <Product data={item} key={item.id} />
      ))}
    </div>
  );
}

export function WomenProducts({ list }) {
  return (
    <div className="products-wrapper">
      {list.map((item) => (
        <Product data={item} key={item.id} />
      ))}
    </div>
  );
}

export function KidsProducts({ list }) {
  return (
    <div className="products-wrapper">
      {list.map((item) => (
        <Product data={item} key={item.id} />
      ))}
    </div>
  );
}
