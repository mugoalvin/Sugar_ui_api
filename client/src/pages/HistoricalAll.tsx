import { CustomTable } from "@/components/customTable"
import Header from "@/components/Header"
import { HistoryAllProps, Sugar } from "@/inferfaces"
import axios from "axios"
import { useEffect, useState } from "react"
import { calculatePricePerKg } from "./AllSugar"


const HistoricalAll = () => {
	const [countrySugar, setCountrySugar] = useState<HistoryAllProps[]>()


	useEffect(() => {
		axios.get('http://localhost:1337/historicalAll')
			.then((res) => {
				setCountrySugar(res.data)
			})
			.catch(error => {
				console.error(error)
			})
	}, [])


	return (
		<>
			<Header title="Latest Historical Prizes For Each Country Daily" />
			<main className="p-5 h-dvh bg-neutral-900 overflow-y-scroll">
				<div className="flex flex-col justify-center w-full">
					<>
						{
							countrySugar?.map(country => {
								return (
									<div className="flex flex-col gap-5">
										<h1 className=" text-5xl text-blue-100 font-bold mt-5 mb-3">{country.country}</h1>
										{
											Object.keys(country.days).map(day => {
												calculatePricePerKg(country.days[day])
												return (
													<section className="bg-blue-950 rounded-2xl p-4">
														<p className="text-neutral-500 ml-3 text-2xl">{new Date(day).toLocaleDateString()}</p>
														<div className="flex gap-5 rounded-2xl p-4 mt-5">
															<CustomTable listOfData={country.days[day] as Sugar[] || []} />
														</div>
													</section>
												)
											})
										}
									</div>
								)
							})
						}
					</>
				</div>
			</main>
		</>
	)
}

export default HistoricalAll