import { Flex } from "@chakra-ui/react";
import React from "react";
import WeatherContainer from "./components/weather-container/WeatherContainer";
import "./css/app.css";

const App = () => {
    return (
      <div className="App" >
        <Flex justify={"center"} align={"center"}>
          <WeatherContainer />
        </Flex >
      </div>
    );
}

export default App;