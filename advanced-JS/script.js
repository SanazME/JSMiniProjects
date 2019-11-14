import { throwStatement } from "@babel/types";

// Function Constructor
var Person = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
    this.calculateAge = function () {
        return 2019 - this.yearOfBirth
    }
}

var john = new Person('John', 1990, 'Teacher');
console.log(john.calculateAge())

/*
Instead of adding excatly the same copies all methods to all instances of the constructor
we add all properties and methods that need to be inherited to the prototype property of
the constructor:
*/

var Person = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

Person.prototype.calculateAge = function () {
    return 2019 - this.yearOfBirth
}

// Another way of creating obj is to use create
// Object.create
let personProto = {
    calculateAge: function () {
        console.log(2019 - this.yearOfBirth);
    }
}

let john = Object.create(personProto, {
    name: {
        value: "John",
        configurable: true,
        writable: true
    },
    job: {
        value: "Teacher",
        configurable: true,
        writable: true
    },
    mood: {
        value: ''
    },
    currentMood: {
        configurable: false,
        get: function () { return this.mood },
        set: function (moodVal) {
            this.mood = moodVal;
            console.log('Setting john.mood to ', this.mood)
        }
    }
});

let a = 20;
let person = {
    name: 'Bob',
    city: 'Paris'
}

function change(a, b) {
    a = 40;
    b.city = 'Boston'
}

change(a, person)
console.log(a)
console.log(person)

function interviewQuestion(job) {
    if (job === 'designer') {
        return function (name) {
            console.log(name + ' , can you please explain UX design?')
        }
    } else if (job === 'teacher') {
        return function (name) {
            console.log(name + ' , what subject do you teach?')
        }
    } else {
        return function (name) {
            console.log('Hello ' + name + ' , what do you do?');
        }
    }
}

let result = interviewQuestion('designer')
result('Bob')

interviewQuestion('teacher')('Marla')


function interviewQuestion2(job) {
    let questions;
    if (job === 'designer') {
        question = name + ' , can you please explain UX design?';
    } else if (job === 'teacher') {
        question = name + ' , what subject do you teach?';
    } else {
        question = 'Hi ' + name + ' , what do you do?';
    }

    return function (name) {
        console.log(question)
    }
}

interviewQuestion2('Kite runner')('Sarah')



let john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function (style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ' ladies and gents! I\'m ' +
                this.name + ' and I\'m a ' +
                this.job + '. I\'m ' +
                this.age + ' years old.')
        } else if (style === 'friendly') {
            console.log('Hey What\'s up? I\'m ' +
                this.name + ' and I\'m a ' +
                this.job + '. I\'m ' +
                this.age + ' years old.' +
                'Have a nice ' + timeOfDay)
        }
    }
}

let emily = {
    name: 'Emily',
    age: 34,
    job: 'doctor'
}

john.presentation.call(emily, 'friendly', 'afternoon')
john.presentation.apply(emily, ['formal', 'morning'])
john.presentation.bind(emily, 'formal', 'morning')






let years = [1990, 1965, 1937, 1981, 2005];

function arrayCalc(arr, func) {
    let arrResult = [];
    arr.forEach(function (ele) {
        arrResult.push(func(ele))
    })
    return arrResult;
}

function calculateAge(birthYear) {
    return 2019 - birthYear;
}

function isFullAge(limit, age) {
    return age >= limit;
}

let ages = arrayCalc(years, calculateAge)

let arrJapan = arrayCalc(ages, isFullAge.bind(this, 20))

Array(5)[true, true, true, true, false]

