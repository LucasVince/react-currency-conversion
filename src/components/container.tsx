import { useState } from "react"
import Select from './select'
import { useQuery } from 'react-query'

const fetchConversionRate = async (from: string, to: string, amount: number) => {
    if (!from || !to || from === to) return null;

    const accessKey = import.meta.env.VITE_API_KEY

    const response = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}&access_key=${accessKey}`)
    const data = await response.json()

    return data;
}

const Container = () => {
    const [firstValue, setFirstValue] = useState('')
    const [secondValue, setSecondValue] = useState('')
    const [amount, setAmount] = useState(0)

    const { data, isLoading, isError} = useQuery({
        queryKey: ['conversion', firstValue, secondValue, amount],
        queryFn: () => fetchConversionRate(firstValue, secondValue, amount),
        retry: 5,
        enabled: !!firstValue && !!secondValue && firstValue !== secondValue
    })

    return (
        <div className="p-5 rounded-lg bg-white shadow-lg flex flex-col items-center gap-1">
            <h1 className="text-center text-2xl font-medium mb-3">Select a Currency and amount</h1>
            <input type="number" placeholder="amount" min={0}
            className="mb-5 p-1 w-full border-2 border-slate-300 rounded-lg"
            onChange={
                (e) => setAmount(parseInt(e.target.value))
            }/>
            <Select value={firstValue} disabledValue={secondValue} onChange={
                (e) => setFirstValue(e.target.value)
            }/>
            <p className="text-center">to</p>
            <Select value={secondValue} disabledValue={firstValue} onChange={
                (e) => setSecondValue(e.target.value)
            }/>
            <p className="text-center mt-5">
                {isLoading && 'Loading...'}
                {isError && 'Erro ao buscar conversão'}
                {data?.result && `${amount} ${firstValue} = ${data.result.toFixed(2)} ${secondValue}`}
            </p>
        </div>
    )
}

export default Container