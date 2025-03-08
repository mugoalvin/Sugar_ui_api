import 'reflect-metadata';
import express from 'express'
import { AppDataSource, initDatabase } from './db.js'
import { Sugar } from './Entities/index.js';
import cors from 'cors'


const app = express();
const port = 1337;

initDatabase()

interface SugarData {
    productName: string;
    size: string;
    price: number;
    country: string;
    timestamp: Date;
}

interface GroupedByCountry {
    [country: string]: SugarData[];
}

interface GroupedByDay {
    [day: string]: SugarData[];
}

app.use(cors())

app.get('/', async (req, res) => {
    res.send("Welcome to the Sugar API")
})


app.get('/countries', async (req, res) => {
    const countries = await AppDataSource
        .getRepository(Sugar)
        .createQueryBuilder('sugar')
        .distinctOn(["sugar.country"])
        .getMany()


    res.status(200).send(countries)
})

// ==================================================================1. Latest Sugar Prizes for all countries==================================================================
app.get('/allSugar', async (req, res) => {
	try {
		const sugar = await AppDataSource
			.getRepository(Sugar)
			.createQueryBuilder("sugar")
            // .select(["productName", "price", "discount", "country", "webLink"])
			.orderBy("sugar.country", "ASC")
			.addOrderBy("sugar.timestamp", "DESC")
            .limit(100)
			.getMany()
            
		res.status(200).json(sugar)
	}
	
    catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Internal Server Error' });
	}
})
// ============================================================================================================================================================================






// =================================================================2. Latest sugar prices for a given country=================================================================
app.get('/sugar/:country', async (req, res) => {
    const { country } = req.params
    try {
        const latestTimestamp = await AppDataSource
            .getRepository(Sugar)
            .createQueryBuilder("sugar")
            .select("MAX(sugar.timestamp)", "max")
            .where("sugar.country = :country", { country: country })
            .getRawOne();

        const sugar = await AppDataSource
            .getRepository(Sugar)
            .createQueryBuilder("sugar")
            .where("sugar.country = :country", { country: country })
            .andWhere("sugar.timestamp = :timestamp", { timestamp: latestTimestamp.max })
            .getMany();

        res.status(200).json(sugar)
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
// ==============================================================================================================================================================================





// ====================================================3. All historical sugar prices for all countries (showing day by day)====================================================
app.get('/historicalAll', async (req, res) => {
    try {
        const results = await AppDataSource
            .getRepository(Sugar)
            .createQueryBuilder("sugar")
            // .select(["sugar.productName", "sugar.size", "sugar.price", "sugar.country", "sugar.timestamp"])
            .orderBy("sugar.country", "ASC")
            .addOrderBy("sugar.timestamp", "DESC")
            .limit(100)
            .getMany();

        // Group by country
        const groupedByCountry = results.reduce((acc, sugar) => {
            const country = sugar.country;
            if (!acc[country]) {
                acc[country] = [];
            }
            acc[country].push(sugar);
            return acc;
        }, {});

        // Group by day within each country
        const groupedByCountryAndDay = Object.keys(groupedByCountry).map(country => {
            const sugars = groupedByCountry[country];

            const groupedByDay: GroupedByDay = sugars.reduce((acc: GroupedByDay, sugar: SugarData) => {
                const day = new Date(sugar.timestamp).toISOString().split('T')[0]; // Extract the date part
                if (!acc[day]) {
                    acc[day] = [];
                }
                acc[day].push(sugar);
                return acc;
            }, {});
            return { country, days: groupedByDay };
        });

        res.status(200).json(groupedByCountryAndDay);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// ==============================================================================================================================================================================



// ==================================================4. All historical sugar prizes for a given country (showing day by day)==================================================
app.get('/historical/:country', async (req, res) => {
    try {
        const { country } = req.params
        const results = await AppDataSource
            .getRepository(Sugar)
            .createQueryBuilder("sugar")
            .select(["sugar.productName", "sugar.size", "sugar.price", "sugar.discount", "sugar.country", "sugar.timestamp"])
            .where("sugar.country = :country", { country: country })
            .addOrderBy("sugar.timestamp", "DESC")
            .getMany();

        // Group by country
        const groupedByCountry = results.reduce((acc, sugar) => {
            const country = sugar.country;
            if (!acc[country]) {
                acc[country] = [];
            }
            acc[country].push(sugar);
            return acc;
        }, {});

        // Group by day within each country
        const groupedByCountryAndDay = Object.keys(groupedByCountry).map(country => {
            const sugars = groupedByCountry[country];

            const groupedByDay: GroupedByDay = sugars.reduce((acc: GroupedByDay, sugar: SugarData) => {
                const day = new Date(sugar.timestamp).toISOString().split('T')[0];
                if (!acc[day]) {
                    acc[day] = [];
                }
                acc[day].push(sugar);
                return acc;
            }, {});
            return { country, days: groupedByDay };
        });

        res.status(200).json(groupedByCountryAndDay);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
// ==============================================================================================================================================================================

app.listen(port, () => {
    console.log(`\nServer listening on port ${port}...`)
})