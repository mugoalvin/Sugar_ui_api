import { Sugar } from "@/inferfaces"
import { useEffect, useState } from "react"
import axios from 'axios'
import { CustomTable } from "@/components/customTable"
import Header from "@/components/Header"


export const calculatePricePerKg = (products: Sugar[]) => {
	products.forEach((sugar) => {
		const weightMatch = sugar.size?.match(/([\d.]+)\s*kg/i);
		const weightInKg = weightMatch ? parseFloat(weightMatch[1]) : null;

		sugar.pricePerKg = weightInKg ? parseFloat((sugar.price / weightInKg).toFixed(2)) : undefined
	})
}


const AllSugar = () => {
	const [fetchedSugar, setFetchedSugar] = useState<Sugar[]>()

	useEffect(() => {
		axios.get('http://localhost:1337/allSugar')
			.then(listOfSugar => {
				calculatePricePerKg(listOfSugar.data)
				setFetchedSugar(listOfSugar.data as Sugar[])
			})

		alert("I'd recommend sorting the table data by Price/Kg for a better experience",)

	}, [])


	return (
		<>
			<Header title="Latest Sugar Prizes For All Countries" />
			<main className="p-5 h-dvh bg-neutral-900">
				<div className="flex gap-5 bg-blue-950 rounded-2xl p-4 mt-5">
					<CustomTable listOfData={fetchedSugar || []} />
				</div>
			</main>
		</>
	)
}

export default AllSugar