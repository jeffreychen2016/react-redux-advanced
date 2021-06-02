import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  { id: "p1", price: 1, title: "title 1", description: "description 1" },
  { id: "p2", price: 2, title: "title 2", description: "description 2" },
];

const Products = (props) => {
  const productList = DUMMY_PRODUCTS.map((product) => (
    <ProductItem
      key={product.id}
      id={product.id}
      title={product.title}
      price={product.price}
      description={product.description}
    />
  ));

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{productList}</ul>
    </section>
  );
};

export default Products;
