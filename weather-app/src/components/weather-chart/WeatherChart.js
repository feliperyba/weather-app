import { Avatar, Box, Center, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { WeatherForecast } from "../../common/enums/WeatherForecast";
import { weatherDataModel } from "../types/WeatherData";

const WeatherChart = (props) => {
  const [selected, setSelected] = useState(true);
  const [dayName, setdayName] = useState(new Date(props.weatherData.date).toLocaleString("default", { weekday: "long" }).toUpperCase());
  const [minTemperature, setminTemperature] = useState(Math.round(Math.min(...props.weatherData.hourly_temperature)));
  const [maxTemperature, setmaxTemperature] = useState(Math.round(Math.max(...props.weatherData.hourly_temperature)));
  const [forecastIcon, setforecastIcon] = useState(getForecastIcon(props.weatherData.forecast));
  const [id, setId] = useState(props.weatherData._id);
  const onClickHandler = props.onClickHandler;

  useEffect(() => {
    checkProps();
    checkSelection();
  });

  function checkProps() {
    setId(props.weatherData._id);
    setdayName(new Date(props.weatherData.date).toLocaleString("default", { weekday: "long" }).toUpperCase());
    setminTemperature(Math.round(Math.min(...props.weatherData.hourly_temperature)));
    setmaxTemperature(Math.round(Math.max(...props.weatherData.hourly_temperature)));
    setforecastIcon(getForecastIcon(props.weatherData.forecast));
  }

  function checkSelection() {
    setSelected(props.selectedWeatherId !== id ? false : true);
  }

  function handleStateOnClick() {
    setSelected(true);
    onClickHandler(props.weatherData);
  }

  function getForecastIcon(forecast) {
    switch (forecast) {
      case WeatherForecast.SUN:
        return process.env.PUBLIC_URL + "/sun.png"
      case WeatherForecast.SUN_CLOUD:
        return process.env.PUBLIC_URL + "/sun-cloud.png"
      case WeatherForecast.CLOUD:
        return process.env.PUBLIC_URL + "/cloud.png"
      case WeatherForecast.RAIN:
        return process.env.PUBLIC_URL + "/rain-cloud.png"
      case WeatherForecast.THURDERSTORM:
        return process.env.PUBLIC_URL + "/rain-thunder.png"
    }
  }

  return (
    <Center
      paddingTop={1}
      maxH={"255px"}
      minH={"255px"}
      maxW={"250px"}
      w={"full"}
      onClick={() => { handleStateOnClick() }}
    >
      <Box
        w={"full"}
        boxShadow={"xl"}
        rounded={"md"}
        overflow={"hidden"}
        css={{
          background: selected ? "rgba(211,211,211,0.75)" : "rgba(211,211,211,0.3)",
        }}
      >
        <Center w={"full"} h={10} fontSize={26} fontWeight="bold" bg="black" color="white">
          {dayName}
        </Center>
        <Flex justify={"center"} mt={12}>
          <Avatar
            size={"lg"}
            src={forecastIcon}
            css={{
              border: "2px solid white",
              background: selected ? "rgba(255,255,255,0.95)" : "rgba(211,211,211,0.3)",
            }}
          />
        </Flex>
        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={10}>
            <Heading fontSize={"3xl"} fontWeight={500} fontFamily={"body"}>
              {maxTemperature + "°"}
            </Heading>
            <Text color={"gray.500"} fontSize={16}>
              {minTemperature + "°"}
            </Text>
          </Stack>
        </Box>
      </Box>
    </Center>
  )
}
export default WeatherChart;

WeatherChart.propTypes = {
  weatherData: weatherDataModel.weatherData,
  onClickHandler: PropTypes.func,
  selectedWeatherId: PropTypes.string
}