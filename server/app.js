const express = require ('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require("./routes")
const path = require('path')
const session = require('express-session');

// app.use(
//     session({
//       secret: process.env.YOUR_SECRET_KEY,
//       resave: false,
//       saveUninitialized: false,
//       cookie: {
//         secure: false,
//         maxAge: 1000 * 60 * 60 * 24
//       }
//     })
// );




app.set('view engine', 'ejs'); // Mengatur EJS sebagai view engine
app.set('views', path.join(__dirname, 'views'));

// Tambahkan beberapa rute
// app.get('/', (req, res) => {
//   res.render('index'); // Menggunakan EJS untuk merender berkas "views/index.ejs"
// });
// const path = require('path')



app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.set('view engine', 'ejs'); // Mengatur EJS sebagai view engine
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

app.use("/", routes)

app.listen(port, () => {
    console.log(`berhasil ${port}` )
})