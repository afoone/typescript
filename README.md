# Curso TypeScript


# narrowing

https://www.codecademy.com/learn/learn-typescript/modules/learn-typescript-types/cheatsheet

SOLID

https://blog.bitsrc.io/solid-principles-in-typescript-153e6923ffdb 


## hola mundo

instalar typescript (tsc)

Para compilar holamundo en el directorio dist:

```
tsc --outDir dist 01-holamundo.ts
```


## Transpilación automática

```
tsc -w --outDir dist *.ts
```

Lo anterior puede dar problemas en windows


## configuración del linter
Para que todo funcione correcto con visual studio code, incluir el siguiente `.tsconfig.json`:

```json
{ 
    "compilerOptions": { 
    },
    "exclude": [
        "node_modules",
        "dist",
        "typings/browser.d.ts",
        "typings/browser/**"
    ]
} 
```

