import pkg from 'mongodb'
import excel from 'exceljs'
const { MongoClient } = pkg

const uri = 'mongodb://10.0.0.74:27017/'
// const uri = 'mongodb://localhost:27017/'

const client = new MongoClient(uri, { useUnifiedTopology: true, authSource: 'admin', auth: { user: 'root', password: 'Xs7TwdZ2dB6Jfpe3' } })
// const client = new MongoClient(uri, { useUnifiedTopology: true })

;(async () => {
  try {
    await client.connect()
    console.log('Conectado correctamente')

    const database = client.db('smemonitor')
    const collection = database.collection('sites')

    const document = await collection.find({}, { projection: { _id: 0, identificador: 1, name: 1, 'datosSite.latitud': 1, 'datosSite.longitud': 1 } })

    const workbook = new excel.Workbook()
    const worksheet = workbook.addWorksheet('Sites')

    worksheet.columns = [
      { header: 'Nombre', key: 'nombre', width: 30 },
      { header: 'Identificador', key: 'identificador', width: 30 },
      { header: 'Latitud', key: 'latitud', width: 30 },
      { header: 'Longitud', key: 'longitud', width: 30 }
    ]

    await document.forEach((site) => {
      worksheet.addRow({
        nombre: site.name,
        identificador: site.identificador,
        latitud: site.datosSite?.latitud,
        longitud: site.datosSite?.longitud
      })
    })

    await workbook.xlsx.writeFile('sites.xlsx')

    client.close()
    console.log('Desconectado de la BBDD')
  } catch (e) {
    console.log(`Error: ${e}`)
  }
}
)()
