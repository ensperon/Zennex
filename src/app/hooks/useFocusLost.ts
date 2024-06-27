import { useEffect, useId } from "react";

// Хук выполняет onFocusLost() при клике по элементу,
// не имеющему класс uid и возвращает uid,
// который нужно добавить в список классов элемента

export const useFocusLost = (onFocusLost: () => void, ...sideEffects: [() => void]) => {
    const random = useId();
    const uid = `generated-class__${random}`;
    const onClickAnywhere = (e: MouseEvent) => {
        const el = e.target
        if (el instanceof Element)
            (!el?.className?.includes(uid))
                && onFocusLost();
    }
    sideEffects.map((fn) => () => fn());
    useEffect(() => {
        window.addEventListener("click", onClickAnywhere);
    }, [])

    return uid;
}