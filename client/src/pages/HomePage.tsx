export default function HomePage() {
	return (
		<div className="bg-blue-950 h-dvh">
			<div className="relative isolate px-6 pt-14 lg:px-8">
				<div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
					<div className="text-center">
						<h1 className="text-5xl font-semibold tracking-tight text-balance text-blue-200 sm:text-7xl">
							Web Scraper, API and UI
						</h1>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<a href="/allSugar" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
								Get started →
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}