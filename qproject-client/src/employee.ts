import axios from 'axios'
import { preguntar } from './lib/preguntar'
import { Turno } from './model/turno'
const app = require('commander')


// Crear un tipo para el turno
// id, servicio, numero



// necesitaremos una acción que cree el turno ,
// nos tendrá que indicar el servicio que quiere

let servicio: string

app
  .version('0.0.1')
  .description('API de cliente de colas')
  .option('-s --service <servicio>', 'Servicio al que se quiere acceder')
  .action((options: { servicio: string }) => {
    servicio = options.servicio
    axios.get<Turno[]>('http://localhost:4000/turnos').then(res => {
      preguntar(res.data)
    })
  })



app.parse(process.argv)
