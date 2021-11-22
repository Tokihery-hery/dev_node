// const {books, category, users} = require('../data_demo/data')

const Query = {
		books:(parent, args, {books})=>books,
		bookByAuthor:(parent, args, {books}) =>{
			let book = books.find(book=>book.author === args.slug)
			return book
		},
		book:(parent, args, {books}) =>{
			let book = books.find(book=>{
				return book.id === args.slug
			})
			return book
		},
		users:(parent, args, {users})=>users,
		user:(parent, args, {users})=>{
			let user = users.find(user=>user.id === args.slug)
			return user
		}
	}

module.exports = Query