const {gql} = require('apollo-server')

//definition type
const typeDefs = gql`
	type Book{
		category:Category!
		title:String!
		author:Users
		id:ID!
	}
	type Users{
		name:String!
		id:ID!
		books:[Book!]!
	}
	type Category{
		id:ID!
		description:String
		name:String!
	}
	type Query{
		books: [Book]
		book(slug:String!):Book
		bookByAuthor(slug:String!):Book
		users:[Users]
		user(slug:String!):Users
	}
	type Mutation{
		#books action
		addBooks(
			category:String,
			title:String!,
			author:String
		):Book
		updateBook(
			id:ID!,
			category:String,
			title:String!,
			author:String
		):Book
		deleteBook(id:String!):String

		#users action

		addUser(
			name:String
		):Users

		updateUser(
			id:ID!,
			name:String
		):Users

		deleteUser(id:ID!):Boolean


	}

`

module.exports = typeDefs