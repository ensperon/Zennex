This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Components

This project contains five components used on main page:

## Select
Select component is a custom multifunctional input component.

Mandatory props:

```value: string``` and ```setValue: (argument: string) => void```: string variable which is intended to control input value. ```setValue``` is a function needed for setting those variable. 

Both props cannot be used together whith ```values``` and ```setValues```

```values: string[]``` and ```setValues: (argument: string[]) => void```: string array intended to contain array of selected options. ```setValues``` if a function needed for setting those array values.

```options: string[]```: string array of select options.

--------------------------------------------------------------------

Optional props:

```type: 'select' | 'multiple'```: string prop defining whether it is possible to multiselect options. 'select' option is used with ```value``` / ```setValue```, 'multiple' option is used with ```values``` / ```setValues```. 

DEFAULT: 'select'

```size: 'large' | 'medium' | 'small'```: string prop that defines style preset. ```size``` affects only CSS styles, not functionality.

DEFAULT: 'medium'

```placeholder: string```: traditional input prop, same as of classic HTML Input.

```combo: boolean```: if true, select turns into combobox with search and autocomplete.

DEFAULT: false

## ProductCard and ProductCards

ProductCards receives array of products as a single prop and maps through it rendering one ProductCard for each element.

ProductCard receives product object and displays its properties in a card.

--------------------------------------------------------------------

## Shopfront

Shopfront accepts ```products``` and ```categories``` as props and drill 'em down to Select and ProductCards.

--------------------------------------------------------------------

## Close

14x14 cross icon which accepts ```onClick: () => void```, ```className: string```, ```style: CSSProperties```, and ```show: boolean``` props.

--------------------------------------------------------------------

## Loader

Spinning circle in the centre of parent component

--------------------------------------------------------------------
