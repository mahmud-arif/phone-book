// require packages
const Koa = require("koa")
const router = require("koa-router")()
const mount = require("koa-mount")
// create an instance of the Koa object
const app = new Koa()
// mount the route
app.use(async (ctx) => {
	ctx.body = "Hello World"
})
app.use(router.routes()) // route middleware
app.listen(5000, () => console.log(`http://localhost:5000`))
