import PropTypes from "prop-types";

export const weatherDataModel = {
    weatherData: PropTypes.shape(
        {
            id: PropTypes.string,
            date: PropTypes.string,
            location: PropTypes.shape(
                {
                    city: PropTypes.string,
                    country: PropTypes.string
                }
            ),
            forecast: PropTypes.number,
            hourly_temperature: PropTypes.arrayOf(PropTypes.number)
        }
    )
}