import { Box, Flex, HStack, Img, StackDivider, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { WeatherForecast } from "../../common/enums/WeatherForecast";
import Clock from "../clock/Clock";
import { weatherDataModel } from "../types/WeatherData";

/**
 * There is a bug happening using function components for some reason, but I didnt had time to spot it and fix it
 * That is the reason to use old school class component here
 */
export default class WeatherDetailChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currTemperature: null,
            visible: false,
            weatherData: null,
            forecastIcon: process.env.PUBLIC_URL + "/placeholder.png",
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.weatherData !== this.props.weatherData) {
            this.getCurrentTemp();
        }
    }

    getCurrentTemp() {
        this.setState({ visible: false });

        const hour = new Date().getHours();
        const temp = this.props.weatherData?.hourly_temperature[hour];
        const forecastIcon = this.getForecastIcon(this.props.weatherData.forecast);

        setTimeout(() => {
            this.setState(
                {
                    currTemperature: temp ? Math.round(temp) + "°" : "",
                    weatherData: { ...this.props.weatherData },
                    forecastIcon: forecastIcon ? forecastIcon : "",
                    visible: this.state.forecastIcon !== forecastIcon ? false : true
                }
            );
        }, 300)
    }

    handleImageLoaded() {
        if (!this.state.visible && this.state.weatherData) {
            this.setState({ visible: true });
        }
    }

    getForecastIcon(forecast) {
        switch (forecast) {
            case WeatherForecast.SUN:
                return process.env.PUBLIC_URL + "/sun-half.png"
            case WeatherForecast.SUN_CLOUD:
                return process.env.PUBLIC_URL + "/sun-cloud-half.png"
            case WeatherForecast.CLOUD:
                return process.env.PUBLIC_URL + "/cloud-half.png"
            case WeatherForecast.RAIN:
                return process.env.PUBLIC_URL + "/rain-cloud-half.png"
            case WeatherForecast.THURDERSTORM:
                return process.env.PUBLIC_URL + "/rain-thunder-half.png"
        }
    }

    render() {
        return (
            <Box
                h={"full"}
                w={"full"}
                overflow={"hidden"}
                className={this.state.visible ? "show" : "hide"}
            >
                <Flex w={"full"}>
                    <Img
                        src={this.state.forecastIcon}
                        // eslint-disable-next-line react/jsx-no-bind
                        onLoad={this.handleImageLoaded.bind(this)}
                        objectFit={"cover"}
                        minH={"512px"}
                        minW={"309px"}
                    />
                    <VStack
                        css={{
                            width: "-webkit-fill-available",
                        }}
                    >
                        <Flex w={"full"}>
                            <Text
                                fontWeight="bold"
                                fontSize={300}
                                color={"black"}
                                h={"full"}
                            >
                                {this.state.currTemperature}
                            </Text>
                            <Clock />
                        </Flex>
                        <Box
                            rounded={"2xl"}
                            bg={"black"}
                        >
                            <HStack
                                spacing={6}
                                marginLeft={"10px"}
                                marginRight={"10px"}
                            >
                                {this.state.weatherData?.hourly_temperature.map((temp, hour) => (
                                    <VStack
                                        key={hour}
                                        divider={<StackDivider borderColor="white" maxH={1} />}
                                        spacing={0}
                                    >
                                        <Text color={"white"} fontSize={10} fontWeight="bold">{hour}</Text>
                                        <Text color={"white"} fontSize={10} fontWeight="bold">{Math.round(temp) + "°"}</Text>
                                    </VStack>
                                ))}
                            </HStack>
                        </Box>
                    </VStack>
                </Flex>
            </Box >
        );
    }
}
WeatherDetailChart.propTypes = {
    weatherData: weatherDataModel.weatherData,
}

/* Broken function component version

const WeatherDetailChart = (props) => {
    const [visible, setVisible] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [currTemperature, setCurrTemperature] = useState(null);
    const [forecastIcon, setForecastIcon] = useState(null);

    useEffect(() => {
        getCurrentTemp();
    }, [weatherData, visible]);

    function getCurrentTemp() {
        setVisible(false)

        const hour = new Date().getHours();
        const temp = props.weatherData?.hourly_temperature[hour];
        const newIcon = getForecastIcon(props.weatherData?.forecast);

        setTimeout(() => {
            setWeatherData({ ...props.weatherData });
            setCurrTemperature(temp ? `${temp}°` : "0°");
            setForecastIcon(newIcon);
        }, 300);

    }

    function handleImageLoaded() {
        if (!visible) {
            setVisible(true)
        }
    }

    function getForecastIcon(forecast) {
        switch (forecast) {
            case WeatherForecast.SUN:
                return process.env.PUBLIC_URL + "/sun-half.png"
            case WeatherForecast.SUN_CLOUD:
                return process.env.PUBLIC_URL + "/sun-cloud-half.png"
            case WeatherForecast.CLOUD:
                return process.env.PUBLIC_URL + "/cloud-half.png"
            case WeatherForecast.RAIN:
                return process.env.PUBLIC_URL + "/rain-cloud-half.png"
            case WeatherForecast.THURDERSTORM:
                return process.env.PUBLIC_URL + "/rain-thunder-half.png"
        }
    }

    return (
        <Box
            h={"full"}
            w={"full"}
            overflow={"hidden"}
            className={visible ? "show" : "hide"}
        >
            <Flex w={"full"}>
                <Img
                    src={forecastIcon}
                    onLoad={handleImageLoaded()}
                    objectFit={"cover"}
                    minH={"512px"}
                    minW={"309px"}
                />
                <VStack
                    css={{
                        width: "-webkit-fill-available",
                    }}
                >
                    <Flex w={"full"}>
                        <Text
                            fontWeight="bold"
                            fontSize={300}
                            color={"black"}
                            h={"full"}
                        >
                            {currTemperature}
                        </Text>
                        <Clock />
                    </Flex>
                    <Box
                        rounded={"2xl"}
                        bg={"black"}
                    >
                        <HStack
                            spacing={6}
                            marginLeft={"10px"}
                            marginRight={"10px"}
                        >
                            {weatherData?.hourly_temperature?.map((temp, hour) => (
                                <VStack
                                    key={hour}
                                    divider={<StackDivider borderColor="white" maxH={1} />}
                                    spacing={0}
                                >
                                    <Text color={"white"} fontSize={10} fontWeight="bold">{hour}</Text>
                                    <Text color={"white"} fontSize={10} fontWeight="bold">{Math.round(temp) + "°"}</Text>
                                </VStack>
                            ))}
                        </HStack>
                    </Box>
                </VStack>
            </Flex>
        </Box >
    );
}
export default WeatherDetailChart*/
