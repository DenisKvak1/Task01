const units = ['', 'одна', 'дві', 'три', 'чотири', 'п\'ять', 'шість', 'сім', 'вісім', 'дев\'ять'];
const unitsF = ['', 'один', 'два', 'три', 'чотири', 'п\'ять', 'шість', 'сім', 'вісім', 'дев\'ять'];
const teens = ['десять', 'одинадцять', 'дванадцять', 'тринадцять', 'чотирнадцять', 'п\'ятнадцять', 'шістнадцять', 'сімнадцять', 'вісімнадцять', 'дев\'ятнадцять'];
const tens = ['', '', 'двадцять', 'тридцять', 'сорок', 'п\'ятдесят', 'шістдесят', 'сімдесят', 'вісімдесят', 'дев\'яносто'];
const hundreds = ['', 'сто', 'двісті', 'триста', 'чотириста', 'п\'ятсот', 'шістсот', 'сімсот', 'вісімсот', 'дев\'ятсот'];

const thousands = ['', 'тисяча', 'тисячі', 'тисяч'];
const millions = ['', 'мільйон', 'мільйона', 'мільйонів'];
const billions = ['', 'мільярд', 'мільярда', 'мільярдів'];

let flag = 0;
function containsCommaOrDot(numberString) {
    return /[,.]/.test(numberString);
}

function ToWords(number) {
    let grug = '';
    if (number<0 ||number > 999999999999 || isNaN(number) || containsCommaOrDot(number)) {
        flag = 1;
        return 'Введіть число у рамках 0-999999999999, ціле без копійок';
    }
    if (number === 0) {
        return ['нуль', grug];
    }
    
    let words = '';
    words = processNumber(Math.floor(number / 1000000000), billions, true)
    number = number % 1000000000;
    words = words + processNumber(Math.floor(number / 1000000), millions, true);
    number = number % 1000000;
    words = words + processNumber(Math.floor(number / 1000), thousands, true);
    number = number % 1000;
    words = words + oneHundreds(number);

    let numb = number % 10;
    switch (true) {
        case (numb == 1):
            grug = ' гривня';
            break;
        case (numb >= 2 && numb <= 4):
            grug = ' гривні';
            break;
        case (numb >= 5 && numb <= 9 || numb == 0):
            grug = ' гривень';
            break;
    }
    return [words.trim(), grug];
}

function oneHundreds(number, flag=false) {
    let words = '';
    words = words + hundreds[Math.floor(number / 100)] + ' ';
    number = number % 100;
    if (number >= 10 && number <= 19) {
        words = words + teens[number - 10] + ' ';
    } else {
        words = words + tens[Math.floor(number / 10)] + ' ' +( flag ? unitsF[number % 10]:units[number % 10] ) + ' ';
    }
    return words.trim();
}

function processNumber(number, suffixArray, flag=false) {
    if (number === 0) return '';
    let words = oneHundreds(number, flag);
    let numb = number % 10;

    switch (true) { 
        case (numb == 1):
            words += ` ${suffixArray[1]} `;
            break;
        case (numb >= 2 && numb <= 4):
            words += ` ${suffixArray[2]} `;
            break;
        case (numb >= 5 && numb <= 9 || numb == 0):
            words += ` ${suffixArray[3]} `;
            break;
    }

    return words;
}

let Button = document.getElementById("calcB");
let Input = document.getElementById("inputValue");
let words = document.getElementById("result");

Button.addEventListener("click", function () {
    if (Input.value) {
        let IV = ToWords(Input.value)[0];
        if (flag != 1) {
            words.textContent = IV.charAt(0).toUpperCase() + IV.slice(1) + ToWords(Input.value)[1];
        } else {
            words.textContent = ToWords(Input.value).charAt(0).toUpperCase() + ToWords(Input.value).slice(1);
        }
        flag = 0;
        Input.value = '';
    }
});
