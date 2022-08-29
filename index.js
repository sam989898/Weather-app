

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();


const apikey ="a410c448a5bb6e280d16637fa6b130b7";

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')

app.get('/', function (req,res) {
    res.render('index',{weather : null,error : null})
})

app.post('/', function(req,res){
    let city = req.body.city
    
    let url ='http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=a410c448a5bb6e280d16637fa6b130b7'
    console.log(req.body.city);
    request(url,function(err, response, body){
        if(err){
            res.render('index', {weather : null, error:'Error,please try again!'})
        } else{
            let weather = JSON.parse(body)
            if(weather.main == undefined){
                res.render('index',
                {weather : null, 
                error:'Error!, please try again'
				});
            }else{
                var kel=273;
                const degrees =Math.trunc((weather.main.temp)-kel)
                let weatherText= 'It'+'s'+ degrees +' degrees celcius with '+(weather.weather[0].main) + ' in '+(weather.name)+' !';
                res.render('index',{weather : weatherText, error:null});
                console.log('body:', body);
            }
        }
    });
});

app.listen(3000, function () {
    console.log("wheatherly app listenning on port 3000!");
})