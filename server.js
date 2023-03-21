//---------------boiler plate code
//https://api.openweathermap.org/data/2.5/weather?q=Warsaw&appid=6e2da3e5d9b9d3af615805a867be3808&units=metric
//http://openweathermap.org/img/wn/04d@2x.png

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
const https = require("https");
const {response} = require("express");

//II
app.set("view engine", "ejs");

app.use(express("public/style.css"))

app.listen(3000, function () {
    console.log("sever started on port 3000");
});
//---------------------------------

app.get("/", function (req, res) {
    // res.sendFile(__dirname+"/index.html");
    res.sendFile(`${__dirname}/index.html`);
})
const appid='6e2da3e5d9b9d3af615805a867be3808';
function CreateURL(city){
    return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}&units=metric`;
}
function CreateiconURL(icon){
    return `http://openweathermap.org/img/wn/${icon}@2x.png`;
}
app.post("/", function (req, res) {
    let city = req.body.city;
    let url=CreateURL(city);
    https.get(url,function (resp){
        resp.on("data",function (data){
            const weatherData=JSON.parse(data)
            const temp=weatherData.main.temp;
            const desc=weatherData.weather[0].description;
            const icon=CreateiconURL(weatherData.weather[0].icon);
            // res.write(`<h1>Temparatura dla ${city}: ${temp}</h1>`);
            // res.write(`<p>Opis: ${desc}</p>`)
            // res.write(`<img src="${icon}">`);
            // res.send();
            let desc2;
            if(temp>5){
                desc2="jest ciepło";
            }
            let renderData={
                cityName:city,
                temperature:temp,
                description:desc,
                ico:icon
            };
            res.render("response",renderData)
        })
    })


})

