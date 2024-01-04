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
        return degreesCelsius - 273.15;
    }

    celsiusInput.addEventListener("keypress", function () {
        fahrenheitResult.value = "";
        kelvinResult.value = "";
    });

    conversionForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const degreesCelsius = celsiusInput.value.trim();
        celsiusInput.classList.remove("invalid");

        if (degreesCelsius.length === 0) {
            errorMessage.innerHTML = 'Необходимо указать значение температуры';
            celsiusInput.classList.add("invalid");

            return;
        }

        if (isNaN(Number(degreesCelsius))) {
            errorMessage.innerHTML = 'Вводить можно только числа';
            celsiusInput.classList.add("invalid");

            return;
        }

        fahrenheitResult.value = getFahrenheit(degreesCelsius);
        kelvinResult.value = getKelvin(degreesCelsius);
    });
});