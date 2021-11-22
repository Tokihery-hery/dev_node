// GraphQl SCHEMA
const graphql = require('graphql')
const _ = require('lodash')
const booksDATA = require('../models/book')
const authorDATA = require('../models/author')
const mongoose = require('mongoose')


const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLList, GraphQLInt, GraphQLNonNull } = graphql
const ValueNotNulSTR = ()=>{
	return new GraphQLNonNull(GraphQLString)
}

//get books with author
const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		_id:{type:GraphQLID},
		title: { type: ValueNotNulSTR() },
		category: { type: ValueNotNulSTR() },
		writeAt: { type: ValueNotNulSTR() },
		authorId:{type:ValueNotNulSTR()},
		author: {
			type: AuthorType,
			resolve(parent, args) {
				//return _.find(authorDATA, { id: parent.authorId })
				console.log(parent.authorId, "parentId")
				return authorDATA.findById(parent.authorId)
			}

		}
	})
})

//get author with more books
const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		_id: { type: GraphQLID },
		name: { type: ValueNotNulSTR() },
		genre: { type: ValueNotNulSTR() },
		age: { type: new GraphQLNonNull(GraphQLInt) },
		country: { type: ValueNotNulSTR() },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				//return _.filter(booksDATA, { authorId: parent.id })
				return booksDATA.find({authorId:parent._id})
			}
		}
	})
})
// query get object data
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: { _id: { type: GraphQLID } },
			resolve(parent, args) {
				// return _.find(booksDATA, { id: args.id })
				return booksDATA.findById(args._id)
			}
		},
		author: {
			type: AuthorType,
			args: { _id: { type: GraphQLID } },
			resolve(parent, args) {
				// return _.find(authorDATA, { _id: args.id })
					console.log(parent, args, "by deleteAuthor")
				// console.log(parent, args)
				return authorDATA.findById(args._id)
			}
		},
		bookList: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return booksDATA.find()
			}
		},
		authorList: {
			type: new GraphQLList(AuthorType),
			resolve(parent, args) {
				return authorDATA.find()
			}
		}
	}
})


//mutation

const RootMutation = new GraphQLObjectType({
	name: 'mutation',
	fields:
	{
		addBook:
		{
			type: BookType,
			args:
			{
				title: { type: ValueNotNulSTR() },
				category: { type: ValueNotNulSTR() },
				writeAt: { type: ValueNotNulSTR() },
				authorId: { type: ValueNotNulSTR() },

			},
			resolve(parent, args) {
				let book = new booksDATA({
					title: args.title,
					category: args.category,
					writeAt: args.writeAt,
					authorId:args.authorId
				})
				return book.save()
			}
		},
		addAuthor:
		{
			type: AuthorType,
			args:
			{
				name: { type: ValueNotNulSTR() },
				genre: { type: ValueNotNulSTR() },
				age: { type: GraphQLInt },
				country: { type: ValueNotNulSTR() },
			},
			resolve(parent, args) {
				let author = new authorDATA({
					name: args.name,
					genre: args.genre,
					age: args.age,
					country:args.country,
				})
				return author.save()
			}
		},
		deleteAuthor:
		{
			type: AuthorType,
			args:
			{
				_id: { type: GraphQLID }
			},
			resolve(parent, args) {
				const res = authorDATA.findOneAndDelete({_id: args._id})
				return res
			}
		}
	}
})
module.exports = new GraphQLSchema(
	{
		query: RootQuery,
		mutation:RootMutation
	}
)