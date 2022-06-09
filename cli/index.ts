const app = require('commander');

app.version('0.0.1').description('CLI para sumar dos números').option(
    '-e --environment <environment>', "Environment to use"
).action(
    (   options: { environment: any; })=> {
       console.log(options.environment)
   }
)

app.parse(process.argv);

