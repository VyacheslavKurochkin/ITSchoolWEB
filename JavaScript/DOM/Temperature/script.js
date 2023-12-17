document.addEventListener("DOMContentLoaded", function () {
    const conversionForm = document.getElementById("input-temperature-form");
    const inputTemperature = document.getElementById("input-temperature");

    const waterFreezingDegreesFahrenheit = 32;
    const celsiusToFahrenheitRate = 1.8;
    const absoluteZeroDegreesCelsius = -273.15;

    function getFahrenheit(degreesCelsius) {
        return waterFreezingDegreesFahrenheit + degreesCelsius * celsiusToFahrenheitRate;
    }

    function getKelvin(degreesCelsius) {
        return absoluteZeroDegreesCelsius + degreesCelsius;
    }

    inputTemperature.addEventListener("keypress", function () {
        document.getElementById("Fahrenheit").value = "";
        document.getElementById("Kelvin").value = "";
    });

    conversionForm.addEventListener("submit", function (e) {
        e.preventDefault();

        let degreesCelsius = inputTemperature.value.trim();
        inputTemperature.classList.remove("invalid");

        if (degreesCelsius.length === 0) {
            document.querySelector(".error-message").innerHTML = `<span>Необходимо указать значение температуры</span>`;
            inputTemperature.classList.add("invalid");

            return;
        }

        if (String(parseFloat(degreesCelsius)) !== String(degreesCelsius)) {
            document.querySelector(".error-message").innerHTML = `<span>Вводить можно только числа</span>`;
            inputTemperature.classList.add("invalid");

            return;
        }

        document.getElementById("Fahrenheit").value = getFahrenheit(degreesCelsius);
        document.getElementById("Kelvin").value = getKelvin(degreesCelsius);
    });
});