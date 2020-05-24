//Указываем какой канвас нужен
const canvas = document.getElementById("game");
//Указываем что это 2d игра
const ctx = canvas.getContext("2d");


//Импортируем изображения
const ground = new Image();
ground.src = "images/square.png";
const foodImg = new Image();
foodImg.src = "images/food.png";

//Размер ячеек
let box = 32;
//Начальное значение баллов
let score = 0;


//Расположение морковки 
/*
1) floor - округляет до целых
2) 17 - ячеек по горизонтали, 15 вертикаль
3) Что бы сделать рандом от 1 до 17 нужно в конце умножить 17 и плюс 1
и нужное растояние 32, тк у нас есть переменная box, можно умножить на неё
*/
let food = {
	x: Math.floor((Math.random() * 17 + 1)) * box,
	// +3 что бы морковка не появлялась за полем 
	y: Math.floor((Math.random() * 15 + 3)) * box
};

let snake = [];

//Начальное положение змейки
snake[0] = {
	//Распологаем по центру
	x: 9 * box,
	y: 10 * box
};

//Обработчик событий
/*
1) Обращаеся к объекту document
2) Вызываем функцию addEventListener
3) Вещаем обработчик событий keydown на весь документ
4) И будем вызывать в обратчике функцию direction
*/
document.addEventListener("keydown", direction);

//Помещаем кнопки
let dir;

//=================Проверяем на какую клавишу нажали==================== 
//37 - левая стрелочка
//Обращаем к event который по умолчанию в addEventListener
function direction(event){
	//Делаем проверку, мы не можем резко повернуть направо если мы повернули налево
	if (event.keyCode == 37 && dir != "right")
		dir = "left";

	else if (event.keyCode == 38 && dir != "down")
		dir = "up";

	else if (event.keyCode == 39 && dir != "left")
		dir = "right";

	else if (event.keyCode == 40 && dir != "up")
		dir = "down";
}

//Функция которая рисует объекты в канвасе
function drawGame() {
	//ctx обращение к игре и русуем зону
	ctx.drawImage(ground, 0, 0);
	//рисуем морковку
	ctx.drawImage(foodImg, food.x, food.y);

	for (let i = 0; i < snake.length; i++) {
		//Цвет змейки и квадрата 
		ctx.fillStyle = "green";
		//Рисуем квадрат
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
	}

	//Цвет шрифта
	ctx.fillStyle = "white";
	//Размер и тип шрифта
	ctx.font = "50px Arial";
	//Рисуем сам текст
	//2.5 это сдвигаем направо на box(32) пикселей
	//1.7 вниз на box пикселей
	ctx.fillText(score, box * 2.5, box * 1.7)

	//Хранят кординаты изначальные
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	//Когда змейка есть еду
	/*
	1) Когда змейка и еда пересекаются, то к счету +1
	2) Когда змейка и еда пересекаются, то еда появляется в новом месте
	3) Если не пересекаются то удаляется последний элемент
	*/
	if(snakeX == food.x && food.y){
		score++;

		food = {
			x: Math.floor((Math.random() * 17 + 1)) * box,
			y: Math.floor((Math.random() * 15 + 3)) * box
		};

	} else
		snake.pop();
	

	//Удаляем последний элемент в змейке
	//snake.pop();

	if(dir == "left") snakeX -= box;
	if(dir == "right") snakeX += box;
	if(dir == "up") snakeY -= box;
	if(dir == "down") snakeY += box;

	let newHead = {
		x: snakeX,
		y: snakeY
	};  
	//Создается часть змейки
	snake.unshift(newHead);
}

//==========ОБЯЗАТЕЛЬНО===================
//Вызываем каждые раз с интервалом 100 мс 
let game = setInterval(drawGame, 100);





