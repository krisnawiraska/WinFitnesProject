const express = require ('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require("./routes")


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use("/", routes)

app.listen(port, () => {
    console.log(`berhasil ${port}` )
})