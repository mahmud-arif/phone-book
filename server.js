// require packages
const Koa = require("koa")
const router = require("koa-router")()
const mount = require("koa-mount")
const koaBody = require("koa-body")
const mongoose = require("mongoose")

// create an instance of the Koa object
const app = new Koa()

// middleware functions
require("koa-validate")(app)
app.use(koaBody())

mongoose
	.connect("mongodb://localhost:27017/my_db", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((result) => console.log("connect successfully"))
	.catch((err) => console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`))

// error handling
app.use(async (ctx, next) => {
	try {
		await next()
	} catch (err) {
		ctx.status = err.status || 500
		ctx.body = err.message
		ctx.app.emit("error", err, ctx)
	}
})

//Schema
require("./models/phonebook")

// mount the route
app.use(mount(require("./router/phonebook")))

app.use(router.routes()) // route middleware
app.listen(5000, () => console.log(`http://localhost:5000`))
