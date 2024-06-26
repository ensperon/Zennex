import { useEffect, useId } from "react";

// Executes onFocusLost() on click on the element withown uid className
// and returns uid that should be added to element classlist

export const useFocusLost = (onFocusLost: () => void, ...sideEffects: [() => void]) => {
    const random = useId();
    const uid = `generated-class__${random}`;
    const onClickAnywhere = (e: MouseEvent) => {
        const el = e.target
        if (el instanceof Element)
            //Check if click is outside of elements marked by uniqueClass
            (!el?.className?.includes(uid))
                && onFocusLost();
    }
    sideEffects.map((fn) => () => fn());
    useEffect(() => {
        window.addEventListener("click", onClickAnywhere);
    }, [])

    return uid;
}