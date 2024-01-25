document.addEventListener("DOMContentLoaded", function () {
    const conversionForm = document.querySelector(".temperature-input-form");
    const celsiusInput = document.querySelector(".celsius-input");
    const errorMessage = document.querySelector(".error-message");

    const fahrenheitResult = document.querySelector(".fahrenheit-result-input");
    const kelvinResult = document.querySelector(".kelvin-result-input");

    function getFahrenheit(degreesCelsius) {
        return 32 + degreesCelsius * 1.8;
    }

    function getKelvin(degreesCelsius) {
        return degreesCelsius + 273.15;
    }

    celsiusInput.addEventListener("keypress", function () {
        fahrenheitResult.value = "";
        kelvinResult.value = "";
    });

    conversionForm.addEventListener("submit", function (e) {
        e.preventDefault();

        errorMessage.classList.remove("invalid");
        const degreesCelsiusString = celsiusInput.value.trim();

        if (degreesCelsiusString.length === 0) {
            errorMessage.textContent = "Необходимо указать значение температуры";
            errorMessage.classList.add("invalid");

            return;
        }

        const degreesCelsius = Number(degreesCelsiusString);

        if (isNaN(degreesCelsius)) {
            errorMessage.textContent = "Вводить можно только числа";
            errorMessage.classList.add("invalid");

            return;
        }

        fahrenheitResult.value = getFahrenheit(degreesCelsius);
        kelvinResult.value = getKelvin(degreesCelsius);
    });
});