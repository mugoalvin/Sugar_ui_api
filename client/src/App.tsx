import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AllSugar from './pages/AllSugar'
import LatestCountry from './pages/LatestCountry'
import HistoricalAll from './pages/HistoricalAll'
import HistoricalCountry from './pages/HistoricalCountry'


function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<HomePage />}/>
				<Route path='/allSugar' element={<AllSugar />} />
				<Route path='/sugar/:country' element={<LatestCountry />} />
				<Route path='/historicalAll' element={<HistoricalAll />} />
				<Route path='/historical/:country' element={<HistoricalCountry />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App