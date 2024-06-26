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
  const products: Products = await getProducts();
  const categories: Categories = await getCategories();
  return (
    <div className={styles.container}>
      <ProductsProvider>
        <Shopfront categories={categories} products={products}/>
      </ProductsProvider>
    </div>
  );
}
const API = 'https://fakestoreapi.com/';

export async function GET(point: string) {
  const res = await fetch(API + point);
  return res.json();
}
export async function getProducts() {
  const res = await GET('products/');
  return res;
}
async function getCategories() {
  const res = await GET('products/categories');
  return res;
}