const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const app = express()

//define paths for express configs

const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine' ,'hbs') //Setting handelbars engine
app.set('views',viewsPath) //specifying views folder
hbs.registerPartials(partialsPath) //specofying partials folder

//Setup static directory to serve
app.use(express.static(publicDirectoryPath)) //This line will directly pick the static html page from public folder if we don't use views

//Route handelers 
app.get('',(req,res)=>
{
    res.render('index',{
        title : 'Weather-App',
        name : 'Akash Chauhan'
    })
})


app.get('/about',(req,res)=>
{
    res.render('about',{
        title : 'About Me : ',
        name : 'Akash Chauhan'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        name : 'Akash Chauhan',
        message : 'How Can we help you ?',
        title : 'Help'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error : "Address Must Be Provided"
        })
    }
    else 
        {
            geocode.geocode(req.query.address,(error,{latitude,longitude,region}={})=>
            {
                if(error)
                    {
                    return res.send({error:error})
                    }
                forecast.forecast(latitude,longitude,(error,forecastData)=>{
                    if(error)
                        {
                            return res.send({error : error})
                        }
                    else 
                        {
                            res.send({
                                region : region,
                                weatherdata : forecastData
                            })
                        }
                    })
            })
        }
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Akash Chauhan',
        errorMessage : "Help Article Not found"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Akash Chauhan',
        errorMessage : "404 Page Not Found"
    })
})

app.listen(3000,()=>
{
    console.log("Server is up on port 3000.")
})
