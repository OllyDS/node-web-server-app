const express = require('express')
const hbs = require('hbs')

const app = express()
const port = 3000

hbs.registerPartials(__dirname + '/views/partials')
app.set('view_engine', 'hbs')

app.use((req, res, next) => {
    const now = new Date().toString()
    console.log(`${now}: ${req.method} ${req.url}`)
    next()
})

// app.use((req, res, next) => {
//     res.render('maintenence.hbs')
// })

app.use(express.static(__dirname + '/public'))
// in-built middleware from express

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: 'Welcome to our page',
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    })
})

app.get('/bad', (request, response) => {
    response.send({
        error: 'Bad Request!'
    })
})

app.listen(port, () => console.log(`Server running on port ${port}`))