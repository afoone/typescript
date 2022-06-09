import axios from "axios"
const app = require('commander')
const inquirer = require('inquirer');


// Crear un tipo para el turno
// id, servicio, numero

type Turno = {
    servicio: string
    id: number
}

// necesitaremos una acción que cree el turno , 
// nos tendrá que indicar el servicio que quiere


app.version('0.0.1').description('API de cliente de colas')
.option(
    "-s --service <servicio>", "Servicio al que se quiere acceder",
).action(
        (options: {servicio: string}) => {
            console.log(options)
            const turno: Partial<Turno> = {
                servicio: options.servicio
            }
            axios.post<Turno>('http://localhost:4000/turnos', turno).then(
                res => {
                    const turno_devuelto: Turno = res.data
                    console.log(`Su turno es ${turno_devuelto.id}`)
                }
            )
        }
)

// inquirer
//   .prompt([
//     {
//       name: 'service',
//       message: 'a qué servicio quieres acceder?'
//     },
//   ])
//   .then(answers => {
//     console.info('Answer:', answers.faveReptile);
//   });

app.parse(process.argv)


