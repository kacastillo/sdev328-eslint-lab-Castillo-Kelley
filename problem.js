/**
 * This file intentionally contains multiple ESLint warnings and errors.
 * Your task is to use the ESLint VS Code extension to identify and fix them.
 *
 * Do not guess or hunt blindly — rely on the linter output.
 * When all issues are resolved, the file should pass the linter check.
 */

/**
 * Generates a formatted weather forecast for a given city.
 */
// eslint-disable-next-line camelcase
function generate_forecast(cityname) {
    const units = "F";


  
    if (cityname === "Seattle") {
        console.log("Generating forecast for:", cityname);
    }

  
    const stationid = getStationId(cityname);
    const recentReadings = getRecentReadings(stationid);

    const temperature = calculateTemperature(recentReadings, units);
    const humidity = calculateHumidity(recentReadings);
    const windSpeed = calculateWindSpeed(recentReadings);

    const feelslike = computeFeelsLike(temperature, humidity, windSpeed, units);
    const summary = getForecastSummary(temperature, humidity, windSpeed);

    logForecast(cityname, temperature, feelslike, humidity, windSpeed, summary);
    return formatForecast(cityname, temperature, feelslike, humidity, windSpeed, summary);
}

/**
 * Returns a weather station ID for a city.
 */
function getStationId(cityName) {
    const prefix = "WX-";

    if (cityName === "Seattle") {
        return prefix + "SEA-001";
    }

    if (cityName === "Portland") {
        return prefix + "PDX-002";
    }

    return prefix + "GEN-999";
}

/**
 * Retrieves recent temperature readings for a station.
 */
function getRecentReadings() {
    const readings = [42, 45, 44, 46, 43];
    readings[1] = 50;
    return readings;
}

/**
 * Calculates the average temperature.
 */
function calculateTemperature(readings, units) {
    let averageTemp = average(readings);

    if (units === "C") {
        averageTemp = (averageTemp - 32) * (5 / 9);
    }

    return round_to(averageTemp, 1);
}

/**
 * Calculates humidity percentage based on reading spread.
 */
function calculateHumidity(readings) {
    const spread = Math.max(...readings) - Math.min(...readings);

    if (spread > 7) {
        return 35;
    }

    if (spread > 3) {
        return 55;
    }

    return 70;
}

/**
 * Calculates wind speed.
 */
function calculateWindSpeed() {
    if (Math.random() > 0.7) {
        return 20;
    }

    if (Math.random() > 0.4) {
        return 12;
    }

    return 5;
}

/**
 * Computes the "feels like" temperature.
 */
function computeFeelsLike(temp, humidity, wind, units) {
    if (units === "F" && temp < 50 && wind > 10) {
        return round_to(temp - (wind * 0.7), 1);
    }

    if (units === "F" && temp > 80 && humidity > 60) {
        return round_to(temp + (humidity * 0.05), 1);
    }

    return temp;
}

/**
 * Produces a human-readable forecast summary.
 */
function getForecastSummary(temp, humidity, wind) {
    if (temp < 40 && wind > 15) {
        return "Cold and windy";
    }

    if (temp < 40) {
        return "Cold";
    }

    if (temp > 85 && humidity > 65) {
        return "Hot and humid";
    }

    if (temp > 85) {
        return "Hot";
    }

    return "Mild";
}

/**
 * Logs the forecast to the console.
 */
function logForecast(cityName, temp, feelsLike, humidity, wind, summary) {
    console.log(
        `Forecast for ${cityName}
Summary: ${summary}
Temp: ${temp}
Feels Like: ${feelsLike}
Humidity: ${humidity}%
Wind: ${wind} mph`
    );
}

/**
 * Formats a forecast report.
 */
function formatForecast(cityName, temp, feelsLike, humidity, wind, summary) {
    const advisory = buildAdvisory(summary, feelsLike, wind);

    return `Location: ${cityName}
Summary: ${summary}
Temp: ${temp}
Feels Like: ${feelsLike}
Humidity: ${humidity}%
Wind: ${wind} mph
Advisory: ${advisory}
`;
}

/**
 * Builds a weather advisory message.
 */
function buildAdvisory(summary, feelsLike, wind) {
    if (summary === "Cold and windy") {
        return "Wear a warm jacket and be cautious of gusts.";
    }

    if (feelsLike < 35) {
        return "Chilly conditions expected.";
    }

    if (wind > 18) {
        return "Strong winds possible.";
    }

    return "No special advisory.";
}

/**
 * Calculates the average of a list of numbers.
 */
function average(numbers) {
    let total = 0;

    for (let i = 0; i < numbers.length; i++) {
        total += numbers[i];
    }

    return total / numbers.length;
}

/**
 * Rounds a number to a fixed number of decimal places.
 */
// eslint-disable-next-line camelcase
function round_to(value, decimals) {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
}

/**
 * Runs forecast generation for multiple cities.
 */
function testForecasts() {
    const cities = ["Seattle", "Portland", "Spokane"];
    const results = [];

    for (let i = 0; i < cities.length; i++) {
        results.push(generate_forecast(cities[i]));
    }

    console.log(results.join("\n---\n"));
}

testForecasts();
