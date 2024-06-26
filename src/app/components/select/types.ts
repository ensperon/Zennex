
export enum Sizes {
    S = 'small',
    L = 'large',
    M = 'medium'
}

export enum Types {
    select = 'select',
    multi = 'multiple'
}

type Options = string[];

type Size = `${Sizes.L}` | `${Sizes.M}` | `${Sizes.S}`;

type RGB = `rgb(${number}, ${number}, ${number})`;

type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;

type HEX = `#${string}`;

type Color = RGB | RGBA | HEX;

export type InputType = `${Types.multi}` | `${Types.select}`;

interface BaseSelectProps {
    options: Options,
    size?: Size,
    placeholder?: string,
    type?: InputType,
    combo?: boolean,
}

interface SingleSelectProps extends BaseSelectProps {
    setValue?: (val: string) => void,
    value?: string,
    values?: never,
    setValues?: never,
    type: `${Types.select}`
}

interface MultipleSelectProps extends BaseSelectProps {
    setValue?: never,
    value?: string,
    values?: string[],
    setValues?: (vals: string[]) => void
    type: `${Types.multi}`
}
export type TOptionsList = {
    outerClassNames: string,
    innerClassNames: string,
    nothingFoundClassNames: string,
    isOpen: boolean,
    onClick: (arg: string) => void,
    options: Options,
    size: Size,
    nothingFound: boolean,
    values: string[],
    styles: {
        readonly [key: string]: string;
    }
}

export type SelectProps = SingleSelectProps | MultipleSelectProps