import { useEffect, useId } from "react";

export const useFocusLost = (onFocusLost: () => void) => {
    const random = useId();
    const uid = `generated-class__${random}`;
    const onClickAnywhere = (e: MouseEvent) => {
        const el = e.target
        if (el instanceof Element)
            //Check if click is outside of elements marked by uniqueClass
            (!el?.className?.includes(uid))
                && onFocusLost();
    }
    useEffect(() => {
        window.addEventListener("click", onClickAnywhere);
    }, [])

    return uid;
}