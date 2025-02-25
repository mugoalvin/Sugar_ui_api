interface HeaderProps {
	title: string
}

const Header = ({ title }: HeaderProps) => {
	return (
		<header className="flex justify-center items-center bg-neutral-300 h-16">
			<h1 className="text-4xl font-bold">{title}</h1>
		</header>
	)
}

export default Header