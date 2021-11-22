const { v4 } = require('uuid')


//action crud


const Mutation = {
	// Book crud
   addBooks:(parent, {title,author,category}, {books})=>{
   	let newBook = {
   		title,
   		author,
   		category,
   		id:v4()
   	}
   	books.push(newBook)
   	return newBook
   },
   updateBook:(parent, {id, title,author,category}, {books})=>{
   	let bookFind = books.find(book=>book.id === id)
   	if (bookFind) {
	   	title?bookFind.title=title:bookFind.title=bookFind.title
		author?bookFind.author=author:bookFind.author=bookFind.author
		category?bookFind.category=category:bookFind.category=bookFind.category	
   	}
   	return bookFind
   }, 
   deleteBook:(parent, {id}, {books})=>{
    let bookFind = books.find(book=>book.id === id)
   	let index = books.findIndex(book=>book.id === id)
   	if(index>=0){
   		books.splice(index, 1)
        return id
   	}
   	return null
   },
   // User crud

   addUser:(parent, {name}, {users})=>{
   	let newUser = {
   		name,
   		id:v4()
   	}
   	users.push(newUser)
   	return newUser
   },
   updateUser:(parent, {id, name}, {users})=>{
   	let userFind = users.find(user=>user.id === id)
   	if (userFind) {
	   	name?userFind.name=name:userFind.name=userFind.name
	   	}
   	return userFind
   }, 
   deleteUser:(parent, {id}, {users})=>{
   	let index = users.findIndex(user=>user.id === id)
   	if(index>=0){
   		users.splice(index, 1)
   		return true
   	}
   	return false
   }
}

module.exports = Mutation