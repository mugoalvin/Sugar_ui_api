import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { User, CreditCard, Settings, Keyboard, Users, UserPlus, Mail, MessageSquare, PlusCircle, Plus, Github, LifeBuoy, Cloud, LogOut } from "lucide-react"
import { DropdownMenuShortcut } from "./ui/dropdown-menu"

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
		<ToggleGroup type="single" variant="outline" className="flex items-center justify-center shadow" onValueChange={(value) => openLink(value)}>
			<ToggleGroupItem value="/allSugar">
				Latest (All)
			</ToggleGroupItem>
			<ToggleGroupItem value="/sugar/:country">

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost">Latest (Country)</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="p-1 bg-neutral-200 rounded z-1 my-2.5 w-56">
						<DropdownMenuLabel className="font-bold m-3 text-xl">Choose Country</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{
							["Kenya", "Uganda"].map(country => (
								<DropdownMenuItem className="flex items-center justify-center h-8 m-2" onClick={(event) => openCountry(event, country)}>
									{country}
								</DropdownMenuItem>
							))
						}
					</DropdownMenuContent>
				</DropdownMenu>

			</ToggleGroupItem>
			<ToggleGroupItem value="/historicalAll">
				Historical (All)
			</ToggleGroupItem>
			<ToggleGroupItem value="/historical/:country">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost">Historical (Country)</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="p-1 bg-neutral-200 rounded z-1 my-2.5 w-56">
						<DropdownMenuLabel className="font-bold m-3 text-xl">Choose Country</DropdownMenuLabel>
						<DropdownMenuSeparator />
						{
							["Kenya", "Uganda"].map(country => (
								<DropdownMenuItem className="flex items-center justify-center h-8 m-2" onClick={(event) => openHistoricalCountry(event, country)}>
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