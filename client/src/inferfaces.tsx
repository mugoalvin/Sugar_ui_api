export interface Sugar {
	id?: number
	image: string
	productName: string
	size: string
	price: number
	pricePerKg?: number
	originalPrice?: number
	discount?: number
	webLink: string
	country: string
	timestamp: string
}

export interface HistoryAllProps {
	country: string;
	days: {
		[key: string]: Sugar[]
	}
}