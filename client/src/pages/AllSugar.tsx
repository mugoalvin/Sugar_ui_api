import { Sugar } from "@/inferfaces"
import { useEffect, useState } from "react"
import axios from 'axios'
import { CustomTable } from "@/components/customTable"
import DataSelector from "@/components/dataSelector"
import Header from "@/components/Header"

const AllSugar = () => {
	const [allSugar, setAllSugar] = useState<Sugar[]>()
	useEffect(() => {
		axios.get('http://localhost:1337/allSugar')
			.then(listOfSugar => {
				setAllSugar(listOfSugar.data as Sugar[])
			})
	}, [])

	return (
		<>
			<Header title="Latest Sugar Prizes For All Countries" />
			<main className="p-5">
				<div className="flex flex-col justify-center w-full">
					<DataSelector />
					<CustomTable listOfData={allSugar || []} />
				</div>
			</main>
		</>
	)
}

export default AllSugar