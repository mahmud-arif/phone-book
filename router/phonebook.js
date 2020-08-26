const Koa = require("koa")
const router = require("koa-router")()
const app = new Koa()
const mongoose = require("mongoose")
const PhoneBook = mongoose.model("PhoneBook")

// Route

//Get all contacts
router.get("/contacts", async (ctx, next) => {
	ctx.body = await PhoneBook.find()
	await next()
})

//Get contacts by id
router.get("/contact/:id", async (ctx, next) => {
	const result = await PhoneBook.findOne({ contactNo: ctx.params.id }).exec()
	if (!result) {
		ctx.throw("No result match for this contact")
	}
	ctx.body = result
	await next()
})

//Add new contact
router.post("/add-contact", async (ctx, next) => {
	const { name, contactNo } = ctx.request.body

	const exist = await PhoneBook.findOne({ contactNo: contactNo })

	if (exist) {
		ctx.throw("contact already exists")
	}
	const phone = /\+?(88)?0?1[56789][0-9]{8}\b/g
	ctx.checkBody("contactNo").match(phone, "this is not valid bangladeshi number")
	if (ctx.errors) {
		ctx.body = ctx.errors
		return
	}
	ctx.body = await new PhoneBook({ name, contactNo }).save()

	await next()
})

// Edit single contacts
router.put("/edit-contact", async (ctx, next) => {
	const exist = await PhoneBook.findOne({ contactNo: ctx.request.body.contactNo })

	if (!exist) {
		ctx.throw("No contact  found")
	}

	ctx.body = await PhoneBook.findOneAndUpdate(
		{
			contactNo: ctx.request.body.contactNo,
		},
		ctx.request.body,
		{
			new: true,
			runValidators: true,
		}
	).exec()

	await next()
})

// Delete contact
router.delete("/delete-contact/:id", async (ctx, next) => {
	const exist = await PhoneBook.findOne({ contactNo: ctx.params.id })

	if (!exist) {
		ctx.throw("No contact  found")
	}

	ctx.body = await PhoneBook.findOneAndDelete({ contactNo: ctx.params.id })
	await next()
})

app.use(router.routes()) // route middleware
module.exports = app
