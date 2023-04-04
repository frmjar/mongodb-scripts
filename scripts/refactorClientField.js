const { MongoClient } = require('mongodb')

const uri = 'mongodb://localhost/'

const client = new MongoClient(uri, { useUnifiedTopology: true })

const refactorClient = async (collection, name, abbr) => {
  const orangeObject = {
    name,
    abbr
  }
  const update = {
    $set: {
      client: orangeObject
    }
  }
  try {
    const { modifiedCount } = await collection.updateMany({ client: name }, update)
    console.log(`${name} modificados: ${modifiedCount}`)
  } catch (e) {
    console.error(`Error updateMany ${name}: ${e}`)
  }
}

;(async () => {
  try {
    await client.connect()
    console.log('Conectado correctamente')

    const clientes = ['Orange', 'Vodafone', 'Yoigo', 'Telefónica España', 'Telefónica México', 'Telefónica Colombia', 'Telefónica Chile', 'Telefónica Perú', 'Cellnex', 'Telxius', 'TowerCo-VDE', 'Altán-Mx']

    const database = client.db('smemonitor')
    const collection = database.collection('sites')

    await clientes.forEach(cliente => {
      switch (cliente) {
        case 'Orange':
          refactorClient(collection, 'Orange', 'Orange')
          break
        case 'Vodafone':
          refactorClient(collection, 'Vodafone', 'Vodafone')
          break
        case 'Yoigo':
          refactorClient(collection, 'Yoigo', 'Yoigo')
          break
        case 'Telefónica España':
          refactorClient(collection, 'Telefónica España', 'T-ESP')
          break
        case 'Telefónica México':
          refactorClient(collection, 'Telefónica México', 'T-MEX')
          break
        case 'Telefónica Colombia':
          refactorClient(collection, 'Telefónica Colombia', 'T-COL')
          break
        case 'Telefónica Chile':
          refactorClient(collection, 'Telefónica Chile', 'T-CHL')
          break
        case 'Telefónica Perú':
          refactorClient(collection, 'Telefónica Perú', 'T-PRU')
          break
        case 'Cellnex':
          refactorClient(collection, 'Cellnex', 'Cellnex')
          break
        case 'Telxius':
          refactorClient(collection, 'Telxius', 'Telxius')
          break
        case 'TowerCo-VDE':
          refactorClient(collection, 'TowerCo-VDE', 'Vantage-Tw')
          break
        case 'Altán-Mx':
          refactorClient(collection, 'Altán-Mx', 'Altán-Mx')
          break
      }
    })

    setTimeout(() => client.close(), 2000)
  } catch (e) {
    console.log(`Error: ${e}`)
  }
}
)()
