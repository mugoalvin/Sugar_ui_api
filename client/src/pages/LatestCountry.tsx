import { CustomTable } from "@/components/customTable"
import DataSelector from "@/components/dataSelector"
import Header from "@/components/Header"
import { Sugar } from "@/inferfaces"
import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

const LatestCountry = () => {
	const [allSugar, setAllSugar] = useState<Sugar[]>()
	const location = useLocation()
	const country: string = location.pathname.split('/').pop() || ''
	
	useEffect(() => {
		axios.get(`http://localhost:1337/sugar/${country}`)
			.then(res => {
				setAllSugar(res.data)
			})
			.catch(error => {
				console.error(error)
			})
	}, [country])

	return (
		<>
			<Header title={`Specific ${country}`} />
			<main className="p-5">
				<div className="flex flex-col justify-center w-full">
					<DataSelector />
					<CustomTable listOfData={allSugar || []} />
				</div>
			</main>
		</>
	)
}

export default LatestCountry