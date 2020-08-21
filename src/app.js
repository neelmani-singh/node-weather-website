const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast') 

const app = express()

// define paths for express config
const publicdirectorypath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname,"../templates/views")
const partialspath = path.join(__dirname,'../templates/partials')

// set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewspath)
hbs.registerPartials(partialspath)

// set up static directory to serve
app.use(express.static(publicdirectorypath))

app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        Name: 'Neelmani Singh'
    })
})
app.get('/about',(req,res) =>  {
    res.render('about',{
        title: 'About me',
        Name: 'Neelmani Singh'
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        helptext: 'This is some helpful text',
        title: 'Help',
        Name: 'Neelmani Singh'
    })
})

app.get('/products',(req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location} = {} ) => {
        if(error){
            return res.send({ error })
        }

        forecast(latitude,longitude, (error,forecastdata) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastdata,
                location,
                address: req.query.address
            })
        })
    })
    
})
app.get('/help/*',(req,res) => { 
    res.render('404',{
        title: '404',
        Name: 'Neelmani Singh',
        errormsg: 'Help article not found'
    })
})
app.get('*',(req,res) => {
    res.render('404',{
        title: '404',
        Name: 'Neelmani Singh',
        errormsg: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})