import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"

const DataSelector = () => {
	const navigate = useNavigate()

	const openLink = (value: string) => {
		if (value) navigate(value)
	}

	const openCountry = (event: React.MouseEvent<HTMLDivElement>, country: string) => {
		event.stopPropagation()
		if (country) navigate(`/sugar/${country}`)
	}

	const openHistoricalCountry = (event: React.MouseEvent<HTMLDivElement>, country: string) => {
		event.stopPropagation()
		if (country) navigate(`/historical/${country}`)
	}

	return (
		<ToggleGroup type="single" variant="default" className="flex items-center justify-center shadow" onValueChange={(value) => openLink(value)}>
			<ToggleGroupItem value="/allSugar" className="text-blue-100 bg-blue-700 hover:bg-blue-900">
				Latest (All)
			</ToggleGroupItem>
			<ToggleGroupItem value="/sugar/:country" className="text-blue-100 bg-blue-700 hover:bg-blue-900">

				<DropdownMenu>
					<DropdownMenuTrigger asChild className="hover:bg-blue-900">
						<Button variant="ghost">Latest (Country)</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="p-1 bg-blue-900 rounded z-1 my-2.5 w-56">
						<DropdownMenuLabel className="font-bold m-3 text-xl text-blue-200">Choose Country</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{
							["Kenya", "Uganda"].map(country => (
								<DropdownMenuItem className="flex items-center justify-center h-8 m-2 text-blue-100" onClick={(event) => openCountry(event, country)}>
									{country}
								</DropdownMenuItem>
							))
						}
					</DropdownMenuContent>
				</DropdownMenu>

			</ToggleGroupItem>
			<ToggleGroupItem value="/historicalAll" className="text-blue-100 bg-blue-700 hover:bg-blue-900">
				Historical (All)
			</ToggleGroupItem>
			<ToggleGroupItem value="/historical/:country" className="text-blue-100 bg-blue-700 hover:bg-blue-900">
				<DropdownMenu>
					<DropdownMenuTrigger asChild className="hover:bg-blue-900">
						<Button variant="ghost" className="text-blue-100">Historical (Country)</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="p-1 bg-blue-900 rounded z-1 my-2.5 w-56">
						<DropdownMenuLabel className="font-bold m-3 text-xl text-blue-200">Choose Country</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{
							["Kenya", "Uganda"].map(country => (
								<DropdownMenuItem className="flex items-center justify-center h-8 m-2 text-blue-100" onClick={(event) => openHistoricalCountry(event, country)}>
									{country}
								</DropdownMenuItem>
							))
						}
					</DropdownMenuContent>
				</DropdownMenu>
			</ToggleGroupItem>
		</ToggleGroup>
	)
}
export default DataSelector