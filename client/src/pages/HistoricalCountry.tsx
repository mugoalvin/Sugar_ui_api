import { CustomTable } from '@/components/customTable'
import Header from '@/components/Header'
import { HistoryAllProps, Sugar } from '@/inferfaces'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { calculatePricePerKg } from './AllSugar'

const HistoricalCountry = () => {
    const [countrySugar, setCountrySugar] = useState<HistoryAllProps>({} as HistoryAllProps)
    const location = useLocation()
    const country = location.pathname.split('/').pop() || ''

    useEffect(() => {
        axios.get(`http://localhost:1337/historical/${country}`)
            .then((res) => {
                setCountrySugar(res.data[0])
            })
            .catch(error => {
                console.error(error)
            })
    }, [country])

    return (
        <>
            <Header title={`Historical records of ${country}`} />
            <main className="p-5 h-dvh bg-neutral-900 overflow-y-scroll">
                <div className="flex flex-col justify-center w-full">
                    <h1 className=" text-5xl text-blue-100 font-bold mt-5 mb-3">{countrySugar?.country}</h1>
                    {
                        countrySugar?.days && Object.keys(countrySugar.days).map(day => {
                            calculatePricePerKg(countrySugar.days[day])
                            return (
                                <section className="bg-blue-950 rounded-2xl p-4 mb-5">
                                    <p className="text-neutral-500 ml-3 text-2xl">{`${day}`}</p>
                                    <div className="flex gap-5 rounded-2xl p-4 mt-5">
                                        <CustomTable listOfData={countrySugar.days[day] as Sugar[] || []} />
                                    </div>
                                </section>
                            )
                        })
                    }
                </div>
            </main>
        </>
    )
}

export default HistoricalCountry