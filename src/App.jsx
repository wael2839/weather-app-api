import * as React from "react";
import { useEffect, useState } from "react";
import moment from "moment/min/moment-with-locales";
import "./App.css";
import theme from "./Theme";

// translate
import { useTranslation } from "react-i18next";

// MUI COMPONENTS
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import CloudIcon from "@mui/icons-material/Cloud";
import { Button } from "@mui/material";

// == MUI COMPONENTS==
import axios from "axios";
// import "moment/locale/ar";

moment.locale("ar");
let axioscleanup = null;
function App() {
  const { t, i18n } = useTranslation();

  const [dataweather, setdataweather] = useState({});
  useEffect(() => {
    i18n.changeLanguage("ar");
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?lat=24.774265&lon=46.738586&appid=a690ded238a54c9ddbd1d7ba0298125f",
        { cancelToken: new axios.CancelToken((c) => (axioscleanup = c)) }
      )
      .then(function (response) {
        // handle success

        const datajson = {
          name: response.data.name,
          temp: Math.round(response.data.main.temp - 272.15),
          tempmin: Math.round(response.data.main.temp_min - 272.15),
          tempmax: Math.round(response.data.main.temp_max - 272.15),
          description: response.data.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
        };
        console.log(datajson);
        setdataweather(datajson);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    return () => {
      if (axioscleanup);
      {
        axioscleanup("axios request canceled");
      }
    };
  }, []);

  const dir = i18n.language == "ar" ? "rtl" : "ltr";
  const handlechangelng = () => {
    if (i18n.language === "ar") {
      moment.locale("en");
      i18n.changeLanguage("en");
    } else {
      i18n.changeLanguage("ar");
      moment.locale("ar");
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" className="">
          {/* card */}
          <div
            dir={dir}
            className=" backdrop-grayscale-40 opacity-100 rounded-md m-0 px-5 py-2 shadow-xl/10"
          >
            {/* content */}
            <div>
              {/* city && time */}
              <div className="flex justify-start items-end gap-3 my-2 mx-3">
                <Typography
                  variant="h3"
                  color="white"
                  sx={{ fontWeight: "600" }}
                >
                  {t(dataweather.name)}
                </Typography>
                <Typography variant="h6" color="white">
                  {moment().format("LLLL")}
                </Typography>
              </div>
              {/*== city && time ==*/}
              <hr className="w-full" />
              <div className="flex flex-row justify-between items-center my-2 mx-3">
                {/* degree && discription */}
                <div>
                  {/* degree  */}
                  <div className="flex flex-row">
                    <Typography variant="h1" color="white">
                      {dataweather.temp}°
                    </Typography>

                    {/* image temp todo */}
                    <img src={dataweather.icon} alt="" />
                  </div>

                  {/*== degree == */}

                  {/* description */}
                  <div>
                    <Typography variant="h6" color="white">
                      {t(dataweather.description)}
                    </Typography>
                    {/* min and max */}
                    <div className="flex justify-start items-center gap-3 my-5">
                      <h5>
                        {t("الصغرى")} : {dataweather.tempmin}
                      </h5>
                      |
                      <h5>
                        {t("الكبرى")} : {dataweather.tempmax}
                      </h5>
                    </div>
                    {/* min and max */}
                  </div>
                  {/*== description ==*/}
                </div>
                {/*== degree && discription ==*/}
                {/* image */}
                <div>
                  <CloudIcon className="text-white text-[100px]! sm:text-[150px]! md:text-[200px]! " />
                </div>
                {/*== image ==*/}
              </div>
            </div>
            {/*== content ==*/}
          </div>
          {/*== card ==*/}
          <Button
            onClick={handlechangelng}
            variant="text"
            color="white"
            className="mt-2!"
          >
            {t("English")}
          </Button>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default App;
