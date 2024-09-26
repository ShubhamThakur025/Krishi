// import React from "react";
import moment from "moment";
import { Button, Card, CardContent, Typography, Grid } from "@mui/material";

const refresh = () => {
  window.location.reload();
};

const Weather = ({weatherData}) => (
  <Card
    sx={{
      width: "85%",
      borderRadius: 3,
      backgroundColor: "primary.main",
      color: "white",
      margin: "0 auto",
    }}
  >
    <CardContent
      sx={{
        padding: 2.5,
        backgroundColor: "grey.800",
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
      }}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        <Typography variant="h3" component="p">
          {weatherData.name}
        </Typography>
        <Button
          variant="outlined"
          color="inherit"
          size="small"
          onClick={refresh}
          sx={{ minWidth: "50px", minHeight: "46px", borderRadius: "60%" }}
        >
          ⟳
        </Button>
      </Grid>
    </CardContent>

    <CardContent>
      <Grid container justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ mb: 2, fontSize: "13px" }}>
          {moment().format("dddd")}, <span>{moment().format("LL")}</span>
        </Typography>
        <Typography variant="h5">{weatherData.weather[0].main}</Typography>
      </Grid>

      <Grid
        container
        justifyContent="space-between"
        sx={{ mb: 2, fontSize: "13px" }}
      >
        <Typography variant="body3">
          Temperature: {weatherData.main.temp} &deg;C
        </Typography>
        <Typography variant="body3" sx={{ mb: 2, fontSize: "13px" }}>
          Humidity: {weatherData.main.humidity} %
        </Typography>
      </Grid>

      <Grid container justifyContent="space-between">
        <Typography variant="body5" sx={{ mb: 2, fontSize: "13px" }}>
          Sunrise:{" "}
          {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-IN")}
        </Typography>
        <Typography variant="body4" sx={{ mb: 2, fontSize: "13px" }}>
          Sunset:{" "}
          {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-IN")}
        </Typography>
      </Grid>
    </CardContent>
  </Card>
);

export default Weather;
