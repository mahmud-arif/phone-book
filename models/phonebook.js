const mongoose = require("mongoose")

const phoneBook = mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: "please Enter your name",
	},
	contactNo: {
		type: String,
		trim: true,
		required: "please Enter contact no",
	},
})

module.exports = mongoose.model("PhoneBook", phoneBook)
