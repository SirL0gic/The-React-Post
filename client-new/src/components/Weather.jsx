import { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function Basic() {
  const [weatheraData, setWeatherData] = useState([]);

  let fetchWeatherData = async () => {
    try {
      // Get user's IP address
      const ipResponse = await axios.get("https://api.ipify.org?format=json");
      const ipAddress = ipResponse.data.ip;

      // Send IP to your backend to get weather data
      const weatherResponse = await axios.post(
        "http://localhost:4000/api/weather",
        { ip: ipAddress }
      );

      setWeatherData(weatherResponse.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  let LoadedWeather = () => {
    return (
      <MDBContainer className="h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="8" lg="6" xl="4">
            <MDBCard style={{ color: "#4B515D", borderRadius: "35px" }}>
              <MDBCardBody className="p-4">
                <div className="d-flex">
                  <MDBTypography tag="h6" className="flex-grow-1">
                    {weatheraData.city}
                  </MDBTypography>
                  <MDBTypography tag="h6">{weatheraData.country}</MDBTypography>
                </div>

                <div className="d-flex flex-column text-center mt-5 mb-4">
                  <MDBTypography
                    tag="h6"
                    className="display-4 mb-0 font-weight-bold"
                    style={{ color: "#1C2331" }}
                  >
                    {weatheraData.temperatureInC}&deg;C
                  </MDBTypography>
                  <span className="small" style={{ color: "#868B94" }}>
                    {weatheraData.conditionText}
                    <img
                      height="30px"
                      src={weatheraData.icon}
                      alt="weather-icon"
                    ></img>
                  </span>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  };

  let UnLoadedWeather = () => {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  };

  return (
    <section>
      {weatheraData.length != 0 ? <LoadedWeather /> : <UnLoadedWeather />}
    </section>
  );
}
