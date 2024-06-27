import { Close as CloseIco } from "../close/Close";
import styles from "./style.module.css";
import React, { ChangeEvent, useRef, useState } from "react";
import { useFocusLost } from "@/app/hooks/useFocusLost";
import { useClassNames } from "@/app/hooks/useClassNames";
import { Types, Sizes, SelectProps, InputType } from "./types";

export const Select = ({
    options,
    size = Sizes.M,
    value = '',
    values = [],
    setValue = () => null,
    setValues = () => null,
    placeholder,
    type = Types.select,
    combo = false
}: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputFocused, setInputFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredOptions = options.filter(o => o.includes(searchQuery))
    const optionsList = combo ? filteredOptions : options;

    //Helpers
    const Open = () => setIsOpen(true);
    const Close = () => setIsOpen(false);
    const Clear = () => {
        setSearchQuery('');
        isType(Types.select)
            ? setValue('')
            : setValues([])
    }
    const isType = (inputType: InputType) => {
        return type === inputType;
    }
    const CloseWithAutocomplete = (strictness: number = 2) => {
        if (filteredOptions.length && searchQuery.length >= strictness) {
            combo
                && !values.includes(filteredOptions[0])
                    && handleChange(filteredOptions[0])
        }
        Close();
        setSearchQuery('');
    }
    // Краткое именование допущено только потому что 
    // сам хук полезной работы по сути не выполняет 
    // и нужен только для читаемости кода.
    const c = useClassNames;

    // Закрытие дропдауна при клике в случае,
    // если цель клика не имеет класса uniqueClass
    const uniqueClass = useFocusLost(
        () => CloseWithAutocomplete(), 
        () => setSearchQuery('')
    )

    const inputText = values.length
        ? values.length === 1
            ? values[0]
            : 'Несколько значений'
        : value
            ? value
            : placeholder

    const inputProps = {
        className: c(
            styles.input,
            styles[size],
            uniqueClass,
            styles[type],
            combo ? styles.combo : '',
            ((values.length || value) || searchQuery) ? styles.textBlack : '',
            ((values.length || value) && !inputFocused) ? styles.placeholderBlack : '',
            values.length > 1 ? styles.placeholderItalic : '',
            (!combo && values.length > 1) ? styles.italic : ''
        ),
        onClick: () => {
            combo
                ? Open()
                : setIsOpen(!isOpen)
        },
        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                CloseWithAutocomplete(1);
                inputRef.current && inputRef.current.blur()
            }
            if(e.key === 'Escape') {
                Close();
                inputRef.current && inputRef.current.blur()
            }
        },
    }
    const comboProps = {
        ...inputProps,
        value: searchQuery,
        onFocus: () => setInputFocused(true),
        onBlur: () => setInputFocused(false),
        onChange: (e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value),
        placeholder: inputText,
    }
    const handleChoose = (option: string) => {
        if (isType(Types.multi)) {
            if (!values.includes(option)) {
                handleChange(option)
            } else {
                const itemToRemove = values.findIndex(el => el === option)
                setValues([
                    ...values.slice(0, itemToRemove),
                    ...values.slice(itemToRemove + 1, values.length)
                ])
            }
        }
        else {
            value !== option
                ? handleChange(option)
                : Clear();
            value !== option && Close();
        }
    }
    const handleChange = (newValue: string) => {
        isType(Types.multi)
            ? setValues([...values, newValue])
            : setValue(newValue)
    }

    return (
        <div className={c(styles.input_wrapper, uniqueClass)}>
            <div>
                <CloseIco show={!!values.length || !!value} onClick={() => Clear()} className={styles.close} />
                {combo
                    ? <input {...comboProps} ref={inputRef} />
                    : <div {...inputProps}>{inputText}</div>}

                <div
                    className={c(styles.list, styles[size], uniqueClass)}
                    style={{ display: isOpen ? 'flex' : 'none', }}
                >
                    {filteredOptions.length
                        ? optionsList.map(
                            (option, i) =>
                                <div
                                    onClick={() => handleChoose(option)}
                                    key={i}
                                    className={c(
                                        styles.list_item,
                                        uniqueClass,
                                        values.includes(option) ? styles.selected : '',
                                        value === option ? styles.selected : ''
                                    )}>
                                    {option}
                                </div>
                        ) :
                        <div className={c(styles.list_item, styles.nothing, uniqueClass)}>
                            Ничего не найдено...
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}