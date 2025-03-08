import { Sugar } from "@/inferfaces"
import { useEffect, useState } from "react"
import axios from 'axios'
import { CustomTable } from "@/components/customTable"
import Header from "@/components/Header"

import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'


export const calculatePricePerKg = (products: Sugar[]) => {
	products.forEach((sugar) => {
		const weightMatch = sugar.size?.match(/([\d.]+)\s*kg/i);
		const weightInKg = weightMatch ? parseFloat(weightMatch[1]) : null;

		sugar.pricePerKg = weightInKg ? parseFloat((sugar.price / weightInKg).toFixed(2)) : undefined
	})
}


const AllSugar = () => {
	const [fetchedSugar, setFetchedSugar] = useState<Sugar[]>()
	const MySwal = withReactContent(Swal)

	useEffect(() => {
		axios.get('http://localhost:1337/allSugar')
			.then(listOfSugar => {
				calculatePricePerKg(listOfSugar.data)
				setFetchedSugar(listOfSugar.data as Sugar[])
			})

		const alertShown = localStorage.getItem('alertShown')
		if (!alertShown) {
			MySwal.fire({
				title: 'Sorting Recommendation',
				text: "I'd recommend sorting the table data by Price/Kg for a better experience",
				icon: 'info',
				confirmButtonText: 'OK'
			}).then ( () =>{
				localStorage.setItem('alertShown', 'true')
			})
		}

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