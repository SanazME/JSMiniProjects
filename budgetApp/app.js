// BUDGET CONTROLLER module
var budgetController = (function () {

    // Expense constructor function
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // Income construcotr
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function (type, des, val) {
            var newItem, id;

            // Create new id
            // [1 2 3 4 5] , next id = 6
            // [1 2 4 6 8] , next id = 9

            if (data.allItems[type].length > 0) {
                id = data.allItems[type][data.allItems[type].length - 1].id + 1;

            } else {
                id = 0;
            }

            // Create new item based on inc or exp type
            if (type == "inc") {
                newItem = new Income(id, des, val);
            } else {
                newItem = new Expense(id, des, val);
            };
            // Push it into data structure
            data.allItems[type].push(newItem);

            // add to total
            data.totals[type] += Number(val);

            // Return new item
            return newItem
        },

        testing: function () {
            return data;
        }
    }

})();

// UI CONTROLLER module
let UIController = (function () {

    var DOMStrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputButton: ".add__btn"
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            }
        },

        getDOMStrings: function () {
            return DOMStrings;
        }
    };

})();

// GLOBAL APP CONTROLLER, an interface between the budget and UI controller modulues
let controller = (function (budgetCtrl, UICtrl) {

    // Function for all eventListeners
    var setupEventListeners = function () {

        var DOM = UICtrl.getDOMStrings();
        // By click
        document.querySelector(DOM.inputButton).addEventListener("click", ctrlAddItem);
        // By enter
        document.addEventListener('keydown', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    }

    let ctrlAddItem = function () {

        // Declare all variables
        var input, newItem;

        // 1. Get input data
        input = UICtrl.getInput();
        console.log(`input : ${input}`);

        // 2. Add the item to the budget controller
        newItem = budgetController.addItem(input.type, input.description, input.value);
        console.log('data object : ', budgetController.testing())


        // 3. Add the item to UI


        // 4. Calculate the budget


        // 5. Display the budget
        console.log('it works')
    }

    return {
        init: function () {
            console.log("Applicaiton has started!")
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();