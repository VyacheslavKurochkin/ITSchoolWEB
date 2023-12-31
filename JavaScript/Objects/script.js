(function () {
    function getCountriesWithMaxCitiesAmount(countries) {
        const maxCitiesAmount = countries.reduce((maxCitiesAmount, country) => {
            return Math.max(maxCitiesAmount, country.cities.length);
        }, 0);

        return countries.filter(country => country.cities.length === maxCitiesAmount);
    }

    function getCountriesPopulationObject(countries) {
        const CountriesPopulationObject = {};

        countries.forEach(country => {
            CountriesPopulationObject[country.name] = country.cities
                .reduce((sumPopulation, city) => sumPopulation + city.population, 0);
        });

        return CountriesPopulationObject;
    }

    const countries = [
        {
            name: "Италия",
            cities: [
                {name: "Рим", population: 1935609},
                {name: "Милан", population: 1095830},
                {name: "Неаполь", population: 745170},
                {name: "Палермо", population: 238705}
            ]
        },
        {
            name: "Венесуэла",
            cities: [
                {name: "Каракас", population: 3300000},
                {name: "Валенсия", population: 830000}
            ]
        },
        {
            name: "Куба",
            cities: [
                {name: "Гавана", population: 2135498},
                {name: "Камагуэй", population: 415000},
                {name: "Гуантанамо", population: 248893}
            ]
        },
        {
            name: "Ватикан",
            cities: [
                {name: "Ватикан", population: 825}
            ]
        },
        {
            name: "Польша",
            cities: [
                {name: "Краков", population: 1497600},
                {name: "Варшава", population: 2327300},
                {name: "Познань", population: 438600},
                {name: "Люблин", population: 489800}
            ]
        }
    ];

    console.log(countries);
    console.log("Страны с максимальным количеством городов:");
    console.log(getCountriesWithMaxCitiesAmount(countries));

    console.log("Новый объект ключ - Страна, значение - численность:");
    console.log(getCountriesPopulationObject(countries));
})();