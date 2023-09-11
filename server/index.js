import fetch from "node-fetch";
import  express  from "express";
import {dirname,join} from 'path'
import { fileURLToPath } from "url";
import cors from 'cors'
import {port} from "./config.js";
import { APIKEY } from "./config.js";
const app = express()

const __dirname = dirname(fileURLToPath(import.meta.url));

const corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(join(__dirname,'../client/dist')))

app.post('/weather',async (req,res) =>{
    const location = req.body.data;
    const apiWeather = `https://api.weatherapi.com/v1/current.json?key=${APIKEY}&q=${location}`;
    try{

        const response = await fetch(apiWeather);
        const data = await response.json();
        const weatherData = {
            city : data.location.name,
            country : data.location.country,
            temperature : data.current.temp_c,
            code:data.current.condition.code,
            icon: data.current.condition.icon,
            description : data.current.condition.text
        }
        res.json(weatherData)
    }catch(error){
        res.send('Algo salio mal :(')
    }
})

app.listen(port)
console.log("server on port",port)


