# Ejemplo GraphQL en NodeJS
#### (GraphQL+Express)

Instalar dependencias e iniciar servidor:
```
npm install
npm start
```
Endpoint:
```
http://localhost:3000/graphql
```

## Queries
```
query mostrartodoslosjugadores{
  todosJugadores {
    id
    nombre
    titulosGanados
    equipo {
      id
      nombre
      titulosGanados
      deporte
    }
  }
}
```

```
query mostrarjugador{
  jugador(nombre:"Luka Doncic") {
    id
    nombre
    titulosGanados
    equipo {
      id
      nombre
      titulosGanados
      deporte
    }
  }
}
```

## Mutations
```
mutation ejemplocrearjugador{
  crearJugador(nombre:"Alberto", IDequipo:3, deporte:"Futbol", titulosGanados:4 ){
    nombre
  }
}
```
