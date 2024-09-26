import { Box, Typography,Grid } from "@mui/material";
import Popularfaqs from "../components/InitialSetup/KnowledgeHubComponents/PopularFaqs"
import WeatherForecast from "../components/InitialSetup/KnowledgeHubComponents/weathers/Weatherforecast";
import Footer from "./Footer";
import knowledgeHub from "../assets/knowledgeHub.jpeg";
import MarketRates from "../components/InitialSetup/KnowledgeHubComponents/Marketforecast";

export default function KnowledgeHub (){
    return (
      <>
        <Box
          sx={{
            display: "flex",
            mt: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            component="h3"
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            Krishi
          </Typography>
          <Typography
            variant="h3"
            component="h3"
            color="primary"
            sx={{ fontWeight: "bold", ml: 3 }}
          >
            कृषि
          </Typography>
        </Box>

        <Grid container sx={{ width: "90vw", margin: "50px" }}>
          <Grid
            item
            xs={12}
            sm={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={knowledgeHub}
              alt="Background"
              sx={{ width: "60%", height: "80%", objectFit: "cover" , borderRadius : "20px" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ p: 3, mt: 3 }}>
            <Typography
              variant="h2"
              component="h2"
              sx={{ textAlign: "left", fontWeight: "bold" }}
            >
              Take Knowledge,
            </Typography>
            <Typography
              variant="h2"
              color="primary"
              component="h2"
              sx={{ textAlign: "left", fontWeight: "bold" }}
            >
              Grow With Krishi
            </Typography>
            <Box
              sx={{
                backgroundColor: "grey.800",
                color: "white",
                p: 3,
                my: 4,
                borderRadius: 2,
                width: ["30vw"],
              }}
            >
              <Typography variant="body2" component="body1" color="grey.100">
                Weather Prediction and market trends will support you to sell
                your products on best prices!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      
          <WeatherForecast />
       
         <MarketRates/>
        <Popularfaqs />
        <Footer />
      </>
    );


}