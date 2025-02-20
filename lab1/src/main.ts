console.log("Інструкція: Функція triangle розв'язує прямокутний трикутник, за двома заданими значеннями елементів і їх типами.");
console.log("Позначення позначають агрументи функції які означають відповідні компоненти трикутника:");
console.log("leg - Катет");
console.log("hypotenuse - Гіпотенуза");
console.log("adjacent angle - Прилеглий до катета кут");
console.log("opposite angle - Протилежний до катета кут");
console.log("angle - Один з двох гострих кутів (коли задана гіпотенуза)");
console.log("Функція повинна приймати аргументи у такому порядку:");
console.log("Значення аргумента 1, «тип» аргумента 1 , значення аргумента 2, «тип» аргумента 2.");
console.log("Приклад коректного виклику функції: triangle(4, \"leg\", 8, \"hypotenuse\");");
console.log("Якщо функція успішно виконала обчислення, вона виведе результати обчислень і поверне success, якщо користувач увів щось неправильно поверне failed та виведе інформацію про помилку.");

function triangle(value1: number, type1: string, value2: number, type2: string): string {
    const validTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];
    
    if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
        console.log("Перечитайте інструкцію та введіть коректні типи.");
        return "failed";
    }
    
    if (value1 <= 0 || value2 <= 0) {
        console.log("Значення аргументів повинні бути додатні.");
        return "failed";
    }
    
    if ((type1.includes("angle") && (value1 <= 0 || value1 >= 90)) || 
        (type2.includes("angle") && (value2 <= 0 || value2 >= 90))) {
        console.log("Кут повинен бути більше 0° та менше 90°.");
        return "failed";
    }
    
    let a: number, b: number, c: number, alpha: number, beta: number;

    if (type1 === "leg" && type2 === "hypotenuse") {
        if (value1 >= value2) {
            console.log("Катет не може бути більшим або рівним гіпотенузі.");
            return "failed";
        }
        a = value1;
        c = value2;
        b = Math.sqrt(c ** 2 - a ** 2);
        alpha = Math.asin(a / c) * (180 / Math.PI);
        beta = 90 - alpha;
    } else if (type1 === "hypotenuse" && type2 === "leg") {
        if (value2 >= value1) {
            console.log("Катет не може бути більшим або рівним гіпотенузі.");
            return "failed";
        }
        c = value1;
        a = value2;
        b = Math.sqrt(c ** 2 - a ** 2);
        alpha = Math.asin(a / c) * (180 / Math.PI);
        beta = 90 - alpha;
    } else if ((type1 === "leg" && type2 === "adjacent angle") || (type1 === "adjacent angle" && type2 === "leg")) {
        alpha = type1 === "adjacent angle" ? value1 : value2;
        a = type1 === "leg" ? value1 : value2;
        b = a / Math.tan(alpha * (Math.PI / 180));
        c = a / Math.sin(alpha * (Math.PI / 180));
        beta = 90 - alpha;
    } else if ((type1 === "leg" && type2 === "opposite angle") || (type1 === "opposite angle" && type2 === "leg")) {
        beta = type1 === "opposite angle" ? value1 : value2;
        a = type1 === "leg" ? value1 : value2;
        b = a / Math.tan(beta * (Math.PI / 180));
        c = a / Math.sin(beta * (Math.PI / 180));
        alpha = 90 - beta;
    } else if ((type1 === "leg" && type2 === "angle") || (type1 === "angle" && type2 === "leg")) {
        alpha = type1 === "angle" ? value1 : value2;
        a = type1 === "leg" ? value1 : value2;
        b = a / Math.tan(alpha * (Math.PI / 180));
        c = a / Math.sin(alpha * (Math.PI / 180));
        beta = 90 - alpha;
    } else {
        console.log("Неможливо обчислити трикутник з введеними типами значень.");
        return "failed";
    }
    
    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(alpha) || isNaN(beta) || a <= 0 || b <= 0 || c <= 0) {
        console.log("Введені значення не утворюють коректний трикутник.");
        return "failed";
    }
    
    if (alpha >= 90 || beta >= 90) {
        console.log("Гострий кут не може бути 90° або більше.");
        return "failed";
    }
    
    if (a >= c || b >= c) {
        console.log("Розраховані значення не утворюють коректний трикутник.");
        return "failed";
    }
    
    console.log(`a = ${a.toFixed(2)}, b = ${b.toFixed(2)}, c = ${c.toFixed(2)}, alpha = ${alpha.toFixed(2)}, beta = ${beta.toFixed(2)}`);
    return "success";
}

