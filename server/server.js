const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const graphql = require('graphql')
const schema = require('../schema/schemat')
const mongoose = require('mongoose')
let cors = require('cors')

// const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLInt, GraphQLNonNull } = graphql

// connect moogose db
mongoose.connect('mongodb://localhost:27017/graphql', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open'
    , () => {
        console.log("Connect to db ")
    }
)
const ValueNotNulSTR = ()=>{
    return new GraphQLNonNull(GraphQLString)
}
const app = express()
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))
app.listen(4000, () => console.log('express grapqhql listen server in poort 4000'))