let express = require('express')
let { graphqlHTTP } = require('express-graphql')
// let  = require('graphql')
let graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLInt, GraphQLNonNull } = graphql

let socket = require('socket.io')
let cors = require('cors')

let app = express()

// app.use((cors))


const ValueNotNulSTR = ()=>{
    return new GraphQLNonNull(GraphQLString)
}

const books = [{
        title:"Node js/graphiql"
    },
    {
        title:"Python/graphiql"
    }
]
// GraphQl SCHEMA
//books
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        _id:{type:GraphQLID},
        title: { type: ValueNotNulSTR() }
    })
})

//query

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: new GraphQLList(BookType),
           resolve(parent, args) {
                return books
            }
        },
    }
})

// app.get('/', (req, res)=> console.log('hello graphql'))
// app.get('/tokihery', (req, res)=> res.render("salut"))

const schema = new GraphQLSchema(
    {
        query: RootQuery
    }
) 

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
//console.log("helllo");

app.listen(4000, () => console.log('express grapqhql listen server in poort 4000'))