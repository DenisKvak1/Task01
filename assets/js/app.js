
const units = ['', 'одна', 'дві', 'три', 'чотири', 'п\'ять', 'шість', 'сім', 'вісім', 'дев\'ять'];
const teens = ['десять', 'одинадцять', 'дванадцять', 'тринадцять', 'чотирнадцять', 'п\'ятнадцять', 'шістнадцять', 'сімнадцять', 'вісімнадцять', 'дев\'ятнадцять'];
const tens = ['', '', 'двадцять', 'тридцять', 'сорок', 'п\'ятдесят', 'шістдесят', 'сімдесят', 'вісімдесят', 'дев\'яносто'];
const hundreds = ['', 'сто', 'двісті', 'триста', 'чотириста', 'п\'ятсот', 'шістсот', 'сімсот', 'вісімсот', 'дев\'ятсот'];


function ToWords(number) {
    if(number>=999 || isNaN(number)){
        return 'Введіть число у рамках 0-999'
    }
    if (number == 0) {
        return 'нуль';
    }
    let words = '';
    words = words+hundreds[Math.floor(number / 100)] + ' ';
    number = number % 100;
    if (number >= 10 && number <= 19) {
        words = words+teens[number - 10] + ' ';
    } else {
        words = words+ tens[Math.floor(number / 10)] + ' ' + units[number % 10] + ' ';
    }
    return words.trim();
}
let Button = document.getElementById("calcB");
let Input = document.getElementById("inputValue");
let words = document.getElementById("result");

Button.addEventListener("click", function() {
    if(Input.value){
        let IV=ToWords(Input.value);
        if(ToWords(Input.value)!='Введіть число у рамках 0-999'){
            words.textContent= IV.charAt(0).toUpperCase() + IV.slice(1) +' гривен';
        }
        else{
            words.textContent= IV.charAt(0).toUpperCase() + IV.slice(1);
        }
        Input.value=''
    }
});
