import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import { Card,CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Sugar } from "@/inferfaces"

interface BarChartProps {
	listOfData: Sugar[]
	date: string
}


export function CustomBarChart({ listOfData, date } : BarChartProps) {
	const chartConfig = {
		desktop: {
			label: "Desktop",
			color: "hsl(var(--chart-1))",
		},
		mobile: {
			label: "Mobile",
			color: "hsl(var(--chart-2))",
		},
		label: {
			color: "hsl(var(--background))",
		},
	} satisfies ChartConfig

	return (
		<Card className="w-1/2 bg-blue-950">
			<CardHeader>
				<CardTitle className="text-blue-100">Comparison Of Prices Per Kg</CardTitle>
				<CardDescription className="text-neutral-400">{date}</CardDescription>
			</CardHeader>
			<CardContent className="h-full">
				<ChartContainer config={chartConfig} >
					<BarChart accessibilityLayer data={listOfData} layout="vertical" margin={{ right: 35 }} barSize={50} >
						<CartesianGrid horizontal={false} />

						<YAxis dataKey="productName" type="category" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value.slice(0, 3)} hide />
						<XAxis dataKey="pricePerKg" type="number" hide />

						<ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
						<Bar
							dataKey="pricePerKg"
							layout="vertical"
							className="fill-blue-800"
							radius={4}
						>
							<LabelList
								dataKey="productName"
								position="insideLeft"
								offset={8}
								className="fill-blue-200"
								fontSize={10}
							/>
							<LabelList
								dataKey="pricePerKg"
								position="right"
								offset={8}
								className="fill-blue-200"
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}