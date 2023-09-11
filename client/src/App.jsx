import React from "react";
import { useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import InputAdornment from "@mui/material/InputAdornment";
import Card from "@mui/material/Card";
import Cloud from "@mui/icons-material/Cloud"
import Explore from "@mui/icons-material/Explore"
import "./index.css";

function App() {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const [weather,setWeather] = useState({
    city:"",
    country:"",
    temp: "",
    condition: "",
    icon: "",
    conditionText:""
  })

  const getWeather = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const response = await axios.post("https://weather-mui-nodejs-121731bb6629.herokuapp.com/weather", {
        data: location,
      });
      const data=response.data;
      setLoading(false);

      setWeather({
        city: data.city,
        country: data.country,
        temp: data.temperature,
        condition: data.code,
        icon: data.icon,
        conditionText:data.description
      })

    } catch (e) {
      console.log(e.error)
    }
    finally{
      setLoading(false)
    }
  };
  

  return (
    <div className="cssbody">
      <br></br>
      <Card sx={{ maxWidth: 500, margin: "auto", borderRadius: 5}}>
        <Container maxWidth="xs" sx={{ mt: 2,mb:15 }}>
          <Box display="flex" alignItems={"center"}>
            <IconButton color="primary">
                <Cloud/>
            </IconButton>
            <Typography variant="h3" component="h1">
              Weather
            </Typography>
          </Box>
          

          <Box
            sx={{ display: "grid", gap: 2, minWidth: 350 }}
            component={"form"}
            autoComplete="off"
            onSubmit={getWeather}
          >
            <TextField
              id="city"
              label="write location"
              size="small"
              variant="outlined"
              required
              fullWidth
              onChange={(e) => setLocation(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Explore
                      sx={{
                        backgroundColor: "#7209b7",
                        borderRadius: "7px",
                        padding:"1px",
                        color:"white"
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />
            <LoadingButton
              type="submit"
              loading={loading}
              loadingIndicator="Loading..."
              variant="contained"
              sx={{backgroundColor: "rgb(238, 42, 125)"}}
            >
              Search
            </LoadingButton>
          </Box>

          {weather.city && (
        <Box
          sx={{
            mt: 2,
            mb:10,
            display: "grid",
            gap: 2,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            component="h2"
          >
            {weather.city}, {weather.country}
          </Typography>
          <Box
            component="img"
            alt={weather.conditionText}
            src={weather.icon}
            sx={{ margin: "0 auto" }}
          />
          <Typography
            variant="h5"
            component="h3"
          >
            {weather.temp} °C
          </Typography>
          <Typography
            variant="h6"
            component="h4"
          >
            {weather.conditionText}
          </Typography>
        </Box>
      )}
        <Typography
        textAlign="center"
        sx={{ mt: 2, fontSize: "10px" }}
      >
        Powered by:{" "}
        <a
          href="https://www.weatherapi.com/"
          title="Weather API"
        >
          WeatherAPI.com
        </a>
      </Typography>
        </Container>
      </Card>
    </div>
  );
}
export default App;
