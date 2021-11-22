//apollo server import
const { ApolloServer}  = require('apollo-server')

//demo data
const {books, category, users} = require('../data_demo/data')

//connect mongoose
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/graphql', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open'
    , () => {
        console.log("Connect to db ")
    }
)

//schema
const typeDefs = require('../schema/schema')

//resolvers
const Query = require('../resolvers/Query')
const Book = require('../resolvers/Book')
const Users = require('../resolvers/Users')
const Mutation = require('../resolvers/Mutation')

//instance appolo server, to create server

const server = new ApolloServer(
	{
		typeDefs, 
		resolvers:{
			Query,
			Mutation,
			Book,
			Users,
		},
		context:{
			books, 
			category, 
			users
		}
	})

//the "listen" method launches web server
server.listen().then(({url})=>{
	console.log(`Server listen un ${url}`)
})