// Функція для перемішування елементів масиву (алгоритм Фішера-Йетса)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // Генерує випадковий індекс
        [array[i], array[j]] = [array[j], array[i]]; // Міняє місцями елементи
    }
    return array; // Повертає перемішаний масив
}

// Отримання посилань на елементи сторінки
let button = document.querySelector('.button'); // Кнопка для початку гри
let start = document.querySelector('.start'); // Початковий екран
let btn1 = document.querySelector('.btn-1'); // Кнопка для легкого рівня
let btn2 = document.querySelector('.btn-2'); // Кнопка для середнього рівня
let btn3 = document.querySelector('.btn-3'); // Кнопка для складного рівня
let second = document.querySelector('.second'); // Екран вибору рівня
let buttons = document.querySelector('.buttons'); // Блок з кнопками вибору рівня
let level = document.querySelector('.level'); // Інформація про рівень
let third = document.querySelector('.third'); // Екран з питаннями
let answer = document.querySelectorAll('.answer'); // Кнопки відповідей
let question = document.querySelector('.question'); // Текст питання

// Дані для різних рівнів складності
let easy = {
    0: ["Where are you from?", "Ukraine", "IDK", "Romania"],
    1: ["Where do you sleep at night?", "Bed", "Table", "Chair"],
    2: ["How many legs does a cat have?", "Four", "Three", "Five"],
    3: ["What do you use to write?", "Pen", "A book", "A cup"],
    4: ["What colors are bananas?", "Yellow", "Blue", "Purple"]
};

let middle = {
    0: ["What day comes after Monday?", "Tuesday", "Wednesday", "Saturday"],
    1: ["Which country is famous for pizza?", "Italy", "Japan", "Ukraine"],
    2: ["What is the synonym of HAPPY?", "Glad", "Angry", "Sad"],
    3: ["What is the capital Of France?", "Paris", "Tokyo", "Rome"],
    4: ["What do you need to open the door?", "Key", "Pen", "Phone"]
};

let hard = {
    0: ["What does 'How are you?' mean?", "How do you feel?", "What is your name?", "Where are you from?"],
    1: ["Which sentence is correct?", "She goes to school", "She going to school", "She go to school"],
    2: ["What does 'break the ice' mean?", "To start a conversation", "To destroy something frozen", "To make someone angry"],
    3: ["What is the capital of Australia?", "Canberra", "Sydney", "Melbourne"],
    4: ["What does 'piece of cake' mean?", "Something very easy", "Something delicious", "A part of dessert"]
};

// Глобальні змінні для збереження поточного рівня, балів та індекса питання
let currentArr;
let total = 0; // Кількість правильних відповідей
let currentIndex = 0; // Поточний індекс питання

// Обробник натискання кнопки "Start" для початку гри
button.addEventListener('click', function () {
    start.style.display = 'none'; // Ховає стартовий екран
    second.style.display = 'block'; // Показує екран вибору рівня
});

// Функція для запуску гри
function startQuiz(levelArr) {
    currentArr = levelArr; // Вибирає набір питань відповідного рівня
    total = 0; // Обнуляє кількість правильних відповідей
    currentIndex = 0; // Починає з першого питання
    second.style.display = 'none'; // Ховає екран вибору рівня
    third.style.display = 'block'; // Показує екран з питаннями
    showQuestion(); // Відображає перше питання
}

// Функція для відображення поточного питання
function showQuestion() {
    if (currentIndex >= Object.keys(currentArr).length) { // Перевіряє, чи не закінчилися питання
        alert(`Quiz finished! Your score: ${total}`); // Виводить результат
        location.reload(); // Перезавантажує сторінку
        return;
    }

    question.innerHTML = currentArr[currentIndex][0]; // Відображає текст питання
    let temp = currentArr[currentIndex].slice(1, 4); // Отримує варіанти відповідей
    temp = shuffle(temp); // Перемішує відповіді
    answer[0].innerHTML = temp[0]; // Прив'язує відповіді до кнопок
    answer[1].innerHTML = temp[1];
    answer[2].innerHTML = temp[2];
    answer.forEach(btn => btn.style.background = ''); // Скидає кольори кнопок
}

// Обробники для вибору рівня складності
btn1.addEventListener('click', () => startQuiz(easy));
btn2.addEventListener('click', () => startQuiz(middle));
btn3.addEventListener('click', () => startQuiz(hard));

// Обробники натискання кнопок відповідей
answer.forEach((btn, index) => {
    btn.addEventListener('click', function () {
        if (btn.innerHTML === currentArr[currentIndex][1]) { // Перевіряє правильність відповіді
            total++; // Збільшує кількість правильних відповідей
            btn.style.background = '#22ff00'; // Зелене тло для правильної відповіді
        } else {
            btn.style.background = '#FF0000'; // Червоне тло для неправильної відповіді
        }

        setTimeout(() => {
            currentIndex++; // Переходить до наступного питання
            showQuestion(); // Відображає нове питання
        }, 1000); // Затримка перед переходом
    });
});
