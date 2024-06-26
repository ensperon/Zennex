import { Product } from "@/app/page";
import styles from "./style.module.css";
import Image from "next/image";

export const ProductCard = ({ product }: { product: Product }) => {
    return (
        <div className={styles.card}>
            <div className={styles.image_wrapper}>
                <Image src={product.image} alt={product.title} width={75} height={75} />
            </div>
            <div className={styles.content}>
                <div className={styles.text_part}>
                    <div className={styles.category}>
                        {product.category}
                    </div>
                    <h3 className={styles.title}>
                        {product.title}
                    </h3>
                    <p className={styles.description}>
                        {product.description}
                    </p>
                </div>
                <span className={styles.price}>
                    {product.price} P
                </span>
            </div>
        </div>
    )
}