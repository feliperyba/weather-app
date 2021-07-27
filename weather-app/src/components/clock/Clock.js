import { Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Clock = () => {
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");

    useEffect(() => {
        var timer = setInterval(() => tick(), 1000);

        return function cleanup() {
            clearInterval(timer);
        };
    });

    function tick() {
        const date = new Date();
        const currHour = date.getHours();
        const currMinute = date.getMinutes();

        setHour(currHour < 10 ? `0${currHour}` : currHour);
        setMinute(currMinute < 10 ? `0${currMinute}` : currMinute);
    }

    return (
        <VStack justify={"center"} align={"left"} paddingLeft={"16px"}>
            <Text maxH={"70px"} color={"gray.500"} fontSize={72}>{hour}</Text>
            <Text color={"gray.500"} fontSize={72}>{minute}</Text>
        </VStack>
    );
}
export default Clock;