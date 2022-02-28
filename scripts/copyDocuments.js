import pkg from 'mongodb';
const { MongoClient } = pkg;

const uri = 'mongodb://localhost:27017/'

//const client = new MongoClient(uri, {useUnifiedTopology: true, authSource: 'admin', auth: {user: 'user', password: 'password'}});
const client = new MongoClient(uri, {useUnifiedTopology: true});

;(async () => {
		try {
			await client.connect();
			console.log('Conectado correctamente')

			const database = client.db("smemonitor")
			const collection = database.collection("site_history_day")

			await Promise.all([[6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23].forEach(async (dia) => {
				const document = await collection.findOne({"_id.siteId": 901, "_id.dateKey.year": 2021, 
															 "_id.dateKey.month": 3,  "_id.dateKey.day": dia})

				document._id.siteId = 906
				document._id.dateKey.day = document._id.dateKey.day - 5
				document._id.dateKey.month = 7

				await collection.deleteOne({"_id.siteId": 906, "_id.dateKey.year": 2021, 
												"_id.dateKey.month": 7,  "_id.dateKey.day": document._id.dateKey.day})
				await collection.insertOne(document)
			})])
			
			setTimeout(() => client.close(), 2000)
		} catch (e) {
			console.log(`Error: ${e}`)
		}
	}
)();