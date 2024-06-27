'use client'

import { Select } from "../select/Select"
import { useState } from "react";
import styles from "./style.module.css";
import { Categories, Products } from "@/app/page";
import { useQuery } from "@tanstack/react-query";
import { ProductCards } from "../product-card/ProductCards";
import { Loader } from "../loader/Loader";

type ShopProps = {
    categories: Categories,
    products: Products,
}
const getProductsByCategory = async (category: string | undefined) => {
    return await fetch('https://fakestoreapi.com/products/category/' + category)
}
const getProductsByCategories = async (categories: Categories | []) => {
    if (!!categories.length) {
        let products: Products = [];
        for (let i = 0; i < categories.length; i++) {
            const res = (await fetch('https://fakestoreapi.com/products/category/' + categories[i])).json();
            products = [...products, ...await res as Products]
        }
        return products
    }
}
const getSortedProducts = async (categories: string | string[] | undefined) => {
    if (!!categories && categories.length) {
        if (Array.isArray(categories)) {
            return await getProductsByCategories(categories)
        } else {
            return await getProductsByCategory(categories)
        }
    }
    return (await fetch('https://fakestoreapi.com/products/')).json();
}

export const Shopfront = ({ products, categories }: ShopProps) => {
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const { data: productsData, isLoading } = useQuery<Products>({
        queryKey: [
            'products', 
            selectedCategory, 
            [...selectedCategories]
        ],
        queryFn: () => getSortedProducts(selectedCategory ?? selectedCategories),
        enabled:
            !!selectedCategory
            || !!selectedCategories.length
    })
    return (
        <div className={styles.widgetContainer}>
            <Select
                //value={selectedCategory}
                values={selectedCategories}
                size="medium"
                //setValue={setSelectedCategory}
                setValues={setSelectedCategories}
                options={categories}
                placeholder="Выберите категорию"
                //type="select"
                type="multiple"
                combo
            />
            <div className={styles.products_list}>
                {!isLoading ? <ProductCards products={productsData ? productsData : products} /> : <Loader />}
            </div>
        </div>
    )
}