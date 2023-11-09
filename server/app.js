const express = require ('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require("./routes")
const path = require('path')


app.set('view engine', 'ejs'); // Mengatur EJS sebagai view engine
app.set('views', path.join(__dirname, 'views'));

// Tambahkan beberapa rute
// app.get('/', (req, res) => {
//   res.render('index'); // Menggunakan EJS untuk merender berkas "views/index.ejs"
// });

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use("/", routes)

app.listen(port, () => {
    console.log(`berhasil ${port}` )
})