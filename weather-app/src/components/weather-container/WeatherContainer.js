import { Box, Flex, Stack } from "@chakra-ui/react";
import React, { useState } from "react";
import Header from "../header/Header";
import WeatherChart from "../weather-chart/WeatherChart";
import WeatherDetailChart from "../weather-detail-chart/WeatherDetailChart";

const WeatherContainer = () => {
    const [weatherDataArr, setWeatherDataArr] = useState([]);
    const [selectedDayData, setSelectedDayData] = useState(null);
    const [visible, setVisible] = useState(false);

    function onChartClick(weatherData) {
        setSelectedDayData({ ...weatherData });
    }

    function fetchAPIData(value) {
        fetch(process.env.WEATHER_API_HOST ? `${process.env.WEATHER_API_HOST}/weather/city/${value}` : `http://localhost:3000/weather/city/${value}`)
            .then(res => res.json())
            .then((data) => {
                const result = [...data].reverse();
                setWeatherDataArr(result)
                setVisible(false);

                setTimeout(() => {
                    setVisible(true);
                }, 500);

                return result;
            })
            .then((result) => {
                setSelectedDayData({ ...result[0] });
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <Box w={"full"} maxW={"1280px"}>
            <Stack>
                <Header onChangeHandler={fetchAPIData} />
                <WeatherDetailChart weatherData={selectedDayData} />
                <Flex
                    justify={"center"}
                    align={"center"}
                    paddingTop={16}
                    className={visible ? "show" : "hide"}
                >
                    {weatherDataArr?.map((weather, i) => (
                        <WeatherChart
                            key={i}
                            weatherData={weather}
                            selectedWeatherId={selectedDayData?._id}
                            onClickHandler={onChartClick}
                        />
                    ))}
                </Flex>
            </Stack>
        </Box>
    );
}
export default WeatherContainer;