const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/register', (req, res) => {
    res.render('site/register')
})

router.post('/register', (req, res) => {
    User.create({...req.body})

    req.session.sessionFlash = {
        type: 'alert alert-success',
        message: 'Kullanıcı başarı ile oluşturuldu.'
    }

        res.redirect('/users/login')
    })


router.get('/login', (req, res) => {
    res.render('site/login')
})

router.post('/login', (req, res) => {
    const{email, password} = req.body

    User.findOne({email}).then((user) => {
        if (user){
            if(user.password == password){
                req.session.userId = user.id
                res.redirect('/')
            } else{
                res.redirect('/users/login')
            } 
        }else{
                res.redirect('/users/register')
            }
        })
    })
    


router.get('/logout', (req, res) => {
    req.session.destroy(()=>{
        res.redirect('/')
    })
})


module.exports = router



