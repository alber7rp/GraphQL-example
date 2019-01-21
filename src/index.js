express = require('express');
graphqlHTTP = require('express-graphql');
app = express();
const { buildSchema } = require('graphql');
_ = require('lodash/core'); //Biblioteca que nos ayuda a manejar de mejor manera arrays

//Formamos el esquema, donde se alojan los tipos de objetos, queries y mutations
schema = buildSchema(`
  type Jugador {
    id: ID
    deporte: String!
    nombre: String!
    titulosGanados: Int!
    equipo: Equipo!
  }

  type Equipo {
    id: ID
    deporte: String!
    nombre: String!
    titulosGanados: Int!
    jugadores: [Jugador!]!
  }

  type Query {
    todosJugadores: [Jugador!]
    jugador(nombre: String): Jugador!
  }

  type Mutation {
    crearJugador(nombre: String, deporte: String, titulosGanados: Int, IDequipo: Int): Jugador
  }`
)

//En este objeto se definirán aquellas funciones que realicen la recolección y modificación de datos de las respectivas queries y mutations
rootValue = {
  todosJugadores: () => {
    return datos['Jugadores']
  },

  jugador: (args) => {
    nombre = args['nombre']
    r = null
    _.forEach(datos['Jugadores'], (x) => {
      if(x['nombre'] == nombre){
        r = x
        return
      }
    })
    return r
  },

  crearJugador: (args) => {
  id = (_.values(datos['Jugadores']).length + 1)
  args['id'] = id
  args['equipo'] = datos['Equipos'][args['IDequipo']-1]
  datos['Jugadores'].push(args)
  return datos['Jugadores'][id-1]
}
}

//Datos hardcodeados
let datos = {
  "Jugadores": [
    {
      "id": "1",
      "nombre": "Messi",
      "titulosGanados": 60,
      "equipo": 1,
      "deporte": "Fútbol"
    },
    {
      "id": "2",
      "nombre": "Ricardinho",
      "titulosGanados": 20,
      "equipo": 3,
      "deporte": "Fútbol Sala"
    },
    {
      "id": "3",
      "nombre": "Sergio Ramos",
      "titulosGanados": 21,
      "equipo": 2,
      "deporte": "Fútbol"
    },
    {
      "id": "4",
      "nombre": "Luka Doncic",
      "titulosGanados": 10,
      "equipo": 4,
      "deporte": "Baloncesto"
    },
    {
      "id": "5",
      "nombre": "Vinicius",
      "titulosGanados": 1,
      "equipo": 2,
      "deporte": "Fútbol"
    },
    {
      "id": "6",
      "nombre": "Keylor Navas",
      "titulosGanados": 6,
      "equipo": 2,
      "deporte": "Fútbol"
    }
  ],

  "Equipos": [
    {
      "id": "1",
      "nombre": "FC Barcerlona",
      "titulosGanados": 90,
      "deporte": "Fútbol"
    },
    {
      "id": "2",
      "nombre": "Real Madrid",
      "titulosGanados": 100,
      "deporte": "Fútbol"
    },
    {
      "id": "3",
      "nombre": "Inter Movistar",
      "titulosGanados": 30,
      "deporte": "Fútbol Sala"
    },
    {
      "id": "4",
      "nombre": "Dallas Mavericks",
      "titulosGanados": 30,
      "deporte": "Baloncesto"
    }
  ]
}

//Ponemos los equipos a los jugadores
_.forEach(datos['Jugadores'], (x, i) => {
  datos['Jugadores'][i]['equipo'] = datos['Equipos'][x['equipo']-1]
  })

app.use('/graphql', function(req, res, next){
    console.log("Consulta realizada");
    next()
  }, graphqlHTTP({
    schema: schema,
    rootValue: rootValue, //Objeto de los resolvers
    graphiql: true //Interfaz interactiva para realizar y mostrar consultas
}));

app.listen(3000);

console.log("GraphQL server listen on 3000 port")
