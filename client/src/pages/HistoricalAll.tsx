import { CustomTable } from "@/components/customTable"
import DataSelector from "@/components/dataSelector"
import Header from "@/components/Header"
import { HistoryAllProps, Sugar } from "@/inferfaces"
import axios from "axios"
import { useEffect, useState } from "react"


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
			<Header title="Latest Hisorical Prizes For All Countries" />
			<main className="p-5">
				<div className="flex flex-col justify-center w-full">
					<DataSelector />
					{
						countrySugar?.map(country => {
							return (
								<>
									<h1>Country: {country.country}</h1>
									{
										Object.keys(country.days).map(day => {
											// const date = new Date(day)
											return (
												<>
													{/* <p>{`${date.getDay()} ${date.getDate()}`}</p> */}
													<p>{`${day}`}</p>
													<CustomTable listOfData={country.days[day] as Sugar[] || []} />
												</>
											)
										})
									}
								</>
							)
						})
					}
				</div>
			</main>
		</>
	)
}

export default HistoricalAll