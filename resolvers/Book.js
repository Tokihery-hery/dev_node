const Book = {
	category:(parent, args, {category})=>{
		return category.find(cat =>cat.id === parent.category)
	},
	author:(parent, args, {users})=>{
		return users.find(user=>user.id === parent.author)
	}
}
module.exports = Book