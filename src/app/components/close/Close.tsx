import { CSSProperties } from "react"
import styles from "./style.module.css"
import { useClassNames } from "@/app/hooks/useClassNames"

export const Close = ({
    className = '',
    onClick,
    style,
    show = true,
}: {
    className?: string,
    onClick: () => void,
    style?: CSSProperties,
    show?: boolean
}) => {
    return (
        show &&
        <div
            style={{ ...style }}
            className={useClassNames(
                styles.closeIco,
                className
            )}
            onClick={() => onClick()}
        >
            X
        </div>
    )
}