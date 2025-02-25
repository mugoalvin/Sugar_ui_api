import { CustomTable } from '@/components/customTable'
import DataSelector from '@/components/dataSelector'
import Header from '@/components/Header'
import { HistoryAllProps, Sugar } from '@/inferfaces'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

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
            <main className='p-5'>
                <div className="flex flex-col justify-center w-full">
                    <DataSelector />
                    <h1>Country: {countrySugar?.country}</h1>
                    {
                        countrySugar?.days && Object.keys(countrySugar.days).map(day => {
                            return (
                                <div key={day}>
                                    <p>{day}</p>
                                    <CustomTable listOfData={countrySugar.days[day] as Sugar[] || []} />
                                </div>
                            )
                        })
                    }
                </div>
            </main>
        </>
    )
}

export default HistoricalCountry