import { Box, Heading, Input, SimpleGrid } from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";

const Header = (props) => {
    const onChangeHandler = props.onChangeHandler;

    return (
        <Box
            maxH={"200px"}
            w={"full"}
            boxShadow={"2xl"}
            rounded={"md"}
            overflow={"hidden"}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
                <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                    Weather
                </Heading>
                <Input
                    type="text"
                    placeholder="Enter city name"
                    onChange={(e) => onChangeHandler(e.target.value)}
                />
            </SimpleGrid>
        </Box>
    );
}
export default Header;

Header.propTypes = {
    onChangeHandler: PropTypes.func
};
