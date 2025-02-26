import DataSelector from "./dataSelector"

interface HeaderProps {
	title: string
}

const Header = ({ title }: HeaderProps) => {
	return (
		<header className="flex items-center justify-between px-3 bg-blue-950 h-16">
			<h1 className="text-2xl font-bold text-blue-100">{title}</h1>
			<DataSelector />
		</header>
	)
}

export default Header