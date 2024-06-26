import { Close as CloseIco } from "../close/Close";
import styles from "./style.module.css";
import React, { ChangeEvent, useEffect, useState } from "react";
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
    const c = useClassNames;

    //Close dropdown on click unless target has uniqueClass
    const uniqueClass = useFocusLost(() => Close())

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
                const interim = values.slice()
                interim.splice(interim.findIndex(el => el === option), 1)
                setValues(interim)
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
    useEffect(() => {
        //Substitute "nearest" value or clear input value if nothing suits
        if (!isOpen && filteredOptions.length && searchQuery)
            combo && handleChange(filteredOptions[0])
        if (!isOpen) setSearchQuery('');
    }, [isOpen])

    return (
        <div className={c(styles.input_wrapper, uniqueClass)}>
            <div>
                <CloseIco show={!!values.length || !!value} onClick={() => Clear()} className={styles.close} />
                {combo
                    ? <input {...comboProps} />
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