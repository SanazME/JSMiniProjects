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
        },
        budget: 0,
        percentage: -1
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
            // data.totals[type] += parseFloat(val);

            // Return new item
            return newItem
        },

        calculateTotals: function (type) {
            // Calculate the total of the type
            var sum = 0;
            data.allItems[type].forEach(function (ele) {
                sum += ele.value;
            })
            data.totals[type] = sum;
        },

        testing: function () {
            console.log(data)
        },

        calculateBudget: function () {
            // Calculate total income & total expense
            this.calculateTotals("inc");
            this.calculateTotals("exp");

            // Calculate total budget : total income - total expense
            data.budget = data.totals.inc - data.totals.exp;

            // Calculate the percentage of income that we spend
            console.log('data.totals.inc :', data.totals.inc)
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }

        },

        getBudget: function () {
            return {
                budget: data.budget,
                income: data.totals.inc,
                expense: data.totals.exp,
                percentage: data.percentage
            }

        }
    }

})();

// UI CONTROLLER module
let UIController = (function () {

    var DOMStrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputButton: ".add__btn",
        incomeContainer: ".income__list",
        expensesContainer: ".expenses__list",
        budgetValue: ".budget__value",
        budgetIncomeValue: ".budget__income--value",
        budgetExpenseValue: ".budget__expenses--value",
        budgetIncomePercentage: ".budget__income--percentage",
        budgetExpensePercentage: ".budget__expenses--percentage"

    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            }
        },

        getDOMStrings: function () {
            return DOMStrings;
        },

        addListItem: function (item, type) {
            var html, newHtml, element;

            // Create HTML strings with placeholder text
            if (type === 'inc') {
                html = '<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix">  <div class="item__value">+ %value%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';

                element = DOMStrings.incomeContainer;

            } else if (type === 'exp') {
                html = '<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">- %value%</div> <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div> </div> </div>';

                element = DOMStrings.expensesContainer;
            };

            // Replace placeholder text with actual data
            newHtml = html.replace('%id%', item.id);
            newHtml = newHtml.replace('%value%', item.value);
            newHtml = newHtml.replace('%description%', item.description);

            // Insert HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function () {
            var fields, fieldsArray;

            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);
            // Create a shallow copy (slice) of an array, here we convert a list to array
            // to use array forEach method on it
            fieldsArray = Array.prototype.slice.call(fields);

            fieldsArray.forEach((current, index, array) => {
                current.value = "";
            });

            fieldsArray[0].focus();
        },
        displayBudget: function (data) {
            document.querySelector(DOMStrings.budgetValue).textContent = data.budget;
            document.querySelector(DOMStrings.budgetIncomeValue).textContent = ' + ' + data.income;
            document.querySelector(DOMStrings.budgetExpenseValue).textContent = ' - ' + data.expense;

            if (data.percentage > 0) {
                document.querySelector(DOMStrings.budgetExpensePercentage).textContent = data.percentage + ' %';
            } else {
                document.querySelector(DOMStrings.budgetExpensePercentage).textContent = '---';
            }
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

    let updateBudget = function () {
        var budget;

        // 1. Calculate the budget
        budgetCtrl.calculateBudget();

        // 2. Return budget
        budget = budgetCtrl.getBudget();

        // 3. Display the budget
        UICtrl.displayBudget(budget);
    }

    let ctrlAddItem = function () {

        // Declare all variables
        var input, newItem;

        // 1. Get input data
        input = UICtrl.getInput();

        // Only proceesd if the input is not empty
        console.log('input : ', input)
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to the budget controller
            newItem = budgetController.addItem(input.type, input.description, input.value);
            console.log(newItem)

            // 3. Add the item to UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Clear fields
            UICtrl.clearFields();

            // 5. Calculate and update budget
            updateBudget();

        }
    }

    return {
        init: function () {
            console.log("Applicaiton has started!")
            UICtrl.displayBudget({
                budget: 0,
                income: 0,
                expense: 0,
                percentage: '---'
            });
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();