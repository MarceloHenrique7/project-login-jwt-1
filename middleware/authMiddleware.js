const jwt = require('jsonwebtoken');
const User = require('../models/User')

const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt;

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken)
                next();
            }
        })
    } else {
        res.redirect('/login')
    }

}

// check current user 

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;


    if (token) {
        jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null; // se der algum erro significa que o user n esta logado, então define como null
                next()
            } else {
                console.log(decodedToken)
                let user = await User.findById(decodedToken.id) // pegando os dados do user na base pelo id do usuario que foi passado para criar o token, 
                res.locals.user = user; // usa res.locals para conseguir pegar os dados do user nas views
                next();
            }
        })
    } else {
        res.locals.user = null; // se o token nao existe significa que o user n esta logado, então define como null
        next()
    }

}

module.exports = { requireAuth, checkUser };