(function () {
    function sortNumbersArrayByDescending(numbersArray) {
        numbersArray.sort((number1, number2) => number2 - number1);
    }

    function getFirstElements(array, elementsCount) {
        return array.slice(0, elementsCount);
    }

    function getLastElements(array, elementsCount) {
        return array.slice(-elementsCount);
    }

    function getEvenNumbersSum(numbersArray) {
        return numbersArray.reduce((sum, number) => number % 2 === 0 ? sum + number : sum, 0);
    }

    function getEvenNumbersSquares(numbersArray) {
        return numbersArray.filter(number => number % 2 === 0)
            .map(number => number * number);
    }

    const numbers1 = [1, 5, 7, 9, 10, 2, 6];

    console.log("Массив чисел:");
    console.log(numbers1);

    sortNumbersArrayByDescending(numbers1);
    console.log("Отсортированный массив:");
    console.log(numbers1);

    console.log("Первые 5 элементов:");
    console.log(getFirstElements(numbers1, 5));

    console.log("Последние 5 элементов:");
    console.log(getLastElements(numbers1, 5));

    console.log("Сумма четных элементов массива: " + getEvenNumbersSum(numbers1));

    const numbers2 = new Array(100);
    
    for (let i = 0; i < numbers2.length; i++) {
        numbers2[i] = i + 1;
    }

    console.log("Массив чисел:");
    console.log(numbers2);

    console.log("Список квадратов четных чисел от 1 до 100:");
    console.log(getEvenNumbersSquares(numbers2));
})();