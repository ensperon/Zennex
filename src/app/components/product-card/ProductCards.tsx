import { Products } from "@/app/page";
import { ProductCard } from "./ProductCard";

export const ProductCards = ({products} : {products: Products}) => {
    if (products) return products && Array.isArray(products) && products.map(product => <ProductCard key={product.id} product={product} />)
}