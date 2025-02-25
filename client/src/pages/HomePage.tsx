import { Link } from "react-router"

const HomePage = () => {
	return (
		<div>
			<h1 className="text-3xl font-bold">Home Page</h1>
			<Link to={'./allSugar'} about="About" children="Open All Sugars" />
		</div>
	)
}

export default HomePage