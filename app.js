/**
 * CS561 ExpressJS Server
 * This server implements REST APIs to server mock resources
 * Author: Sagar Karki
 */
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const JWT_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6InNhZ2FyLXRlc3QtdXNlciIsImlhdCI6MTY0NDE4MDk0MH0.HGoT3-74z1C1-38JZze9IbBCtA8zegyOMFocbpmrVXw"

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    const allowedOrigins = ['https://editor.swagger.io', 'https://hoppscotch.io','http://ec2-54-164-146-132.compute-1.amazonaws.com:3002'];
    const origin = req.headers.origin;
    
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    
    // Request methods you wish to allow eg: GET, POST, OPTIONS, PUT, PATCH, DELETE
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Pass to next layer of middleware
    next();
});

app.get('/v1/weather', (req, res) => {
	var tokenHeader = req.headers["authorization"]

	if(!tokenHeader){
		res.status(400)
		res.json({ "message": "Authorization header not found" })
	}

	var tokens = tokenHeader.split(" ")
	
	if(tokens.length != 2){
		res.status(400)
		res.json({ "message": "Bearer token not found" })
	}

	if(tokens[1] != JWT_TOKEN){
		res.status(401)
		res.json({ "message": "Bearer token invalid" })
	}

	res.status(200)
	res.json({ "coord": { "lon": -123.262, "lat": 44.5646 }, "weather": [{ "id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n" }], "base": "stations", "main": { "temp": 39.47, "feels_like": 39.47, "temp_min": 36.81, "temp_max": 47.17, "pressure": 1020, "humidity": 72 }, "visibility": 10000, "wind": { "speed": 2.95, "deg": 357, "gust": 2.93 }, "clouds": { "all": 99 }, "dt": 1642381311, "sys": { "type": 2, "id": 2040223, "country": "US", "sunrise": 1642347934, "sunset": 1642381185 }, "timezone": -28800, "id": 5720727, "name": "Corvallis", "cod": 200 })
});

app.get('/v1/hello', (req, res) => {
	var tokenHeader = req.headers["authorization"]

	if(!tokenHeader){
		res.status(400)
		res.json({ "message": "Authorization header not found" })
	}

	var tokens = tokenHeader.split(" ")
	
	if(tokens.length != 2){
		res.status(400)
		res.json({ "message": "Bearer token not found" })
	}

	if(tokens[1] != JWT_TOKEN){
		res.status(401)
		res.json({ "message": "Bearer token invalid" })
	}

	res.status(200)
	res.json({ "message": "Watch one piece!" })
});

app.post('/v1/auth', (req, res) => {
	var username = req.body.username;
	var password = req.body.password;

	if (username && password) {
		res.json({
			"token": JWT_TOKEN,
			"expires": "2012-04-23T18:25:43.511Z"

		})

	}
	else {
		res.status(400)
		res.json({ "message": "Invalid credentials" })

	}

});

app.listen(3000, () => {
	console.log("Started on PORT 3000");
})
