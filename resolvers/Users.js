const Users= {
	books:(parent, args, { books })=>{
		let book = books.filter(book=>book.author === parent.id)
		return book
	}
}
module.exports = Users