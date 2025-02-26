import { CustomTable } from "@/components/customTable"
import DataSelector from "@/components/dataSelector"
import Header from "@/components/Header"
import { Sugar } from "@/inferfaces"
import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { calculatePricePerKg } from "./AllSugar"

const LatestCountry = () => {
	const [allSugar, setAllSugar] = useState<Sugar[]>()
	const location = useLocation()
	const country: string = location.pathname.split('/').pop() || ''
	
	useEffect(() => {
		axios.get(`http://localhost:1337/sugar/${country}`)
			.then(res => {
				calculatePricePerKg(res.data)
				setAllSugar(res.data)
			})
			.catch(error => {
				console.error(error)
			})
	}, [country])

	return (
		<>
			<Header title={`Latest In ${country}`} />
			<main className="p-5 h-dvh bg-neutral-900">
					<div className="flex gap-5 bg-blue-950 rounded-2xl p-4 mt-5">
						<CustomTable listOfData={allSugar || []} />
					</div>
			</main>
		</>
	)
}

export default LatestCountry