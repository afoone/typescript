import { Turno } from "../model/turno"

const inquirer = require('inquirer')

export const preguntar = (waiting_queue: Turno[]) => {

    inquirer
      .prompt([
        {
          name: 'turno',
          message: `
          ¿A quien vas a llamar?
          0 - Al siguiente
          Otros: introducir número de turno:
          ${waiting_queue.map(t => t.id).join('-')}
          `,
        },
      ])
      .then(answers => {
        console.info('Answer:', answers.turno)
      })
  }