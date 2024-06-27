import ProductsProvider from "@/Providers/ProductsProvider";
import { Shopfront } from "./components/shopfront/Shopfront";
import styles from './page.module.css'

export type Product = {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: { rate: number, count: number },
}
export type Category = string;
export type Products = Product[];
export type Categories = Category[];

export default async function Home() {
  const products: Products = await getProducts() as unknown as Products;
  const categories: Categories = await getCategories() as unknown as Categories;
  return (
    <div className={styles.container}>
      <ProductsProvider>
        <Shopfront categories={categories} products={products}/>
      </ProductsProvider>
    </div>
  );
}

async function getCategories() {
  const res = await fetch('https://fakestoreapi.com/products/categories');
  return res.json();
}
async function getProducts() {
  const res = await fetch('https://fakestoreapi.com/products');
  return res.json();
}