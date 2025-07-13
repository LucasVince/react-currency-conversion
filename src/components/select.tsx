import type { FC } from "react"

interface selectProps {
    value: string;
    disabledValue: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select:FC<selectProps> = ({value, disabledValue, onChange}) => {
    return (
        <select className="text-center w-auto p-1 rounded-md border-2 border-slate-300" value={value}
            onChange={onChange}
            >
                <option value="" disabled>select a currency</option>
                <option value="brl" disabled={disabledValue === 'brl'}>BRL</option>
                <option value="usd" disabled={disabledValue === 'usd'}>USD</option>
                <option value="jpy" disabled={disabledValue === 'jpy'}>JPY</option>
                <option value="cad" disabled={disabledValue === 'cad'}>CAD</option>
                <option value="eur" disabled={disabledValue === 'eur'}>EUR</option>
                <option value="gbp" disabled={disabledValue === 'gbp'}>GBP</option>
            </select>
    )
}

export default Select