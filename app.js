const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
require('dotenv').config();

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = process.env.MONGODB_CONNECT_URL;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(process.env.PORT))
  .catch((err) => console.log(err));

// routes
app.get('*', checkUser); // app.get('*') significa que para todas rotas app.get() esse middlware vai ser executado 
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);

























// app.get('/set-cookies', (req, res) => {

//   // res.setHeader('Set-Cookie', 'newUser=true') // setando cookie

//   res.cookie('newUser', false) // setando cookie outra forma
//   res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true} ) // 
//   /*
  
//     set cookie passando um objeto com proiedade, "maxAge" -> 
//     significa o tempo max que esse cookie vai ser guardado
//     no navegador do usuario, "1000 * 60 * 60 * 24" -> e uma
//     conta para calcular 24 horas
    
//     propiedade => "secure: true" -> significa que o cookie só será enviado
//                   quando temos uma conexão https, uma conexão segura
    
//     propiedade => "httpOnly: true" -> significa que eu não consigo acessar 
//                   esse cookie atraves do javaScript ou pelo console
//     */
//   res.send('you got the cookies!')

// });


// app.get('/read-cookies', (req, res) => {

//   const cookies = req.cookies;
//   console.log(cookies.newUser)

//   res.json(cookies)

// });