'use strict';

let start = document.getElementById('start');
let incomePlus = document.getElementsByTagName('button')[0];
let expensesPlus = document.getElementsByTagName('button')[1];
let depositCheck = document.querySelector('#deposit-check');
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let resultTotal = document.getElementsByClassName('result-total');
let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let incomeItems = document.querySelectorAll('.income-items');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
let additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];
let depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');
let targetAmount = document.querySelector('.target-amount');
let targetMonthValue = document.getElementsByClassName('target_month-value')[0];
let incomePeriodValue = document.getElementsByClassName('income_period-value')[0];
let additionalExpenses = document.querySelector('.additional_expenses');
let budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
let expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
let budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');



let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


let appData = {
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,

    start: function() {

        if(salaryAmount.value === ''){
            alert('Поле "месячный доход" должно быть заполнено!');
            return;
        }
        appData.budget = +salaryAmount.value;
        console.log('salaryAmount.value', salaryAmount.value);

        
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getTargetMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();
    },

    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcPeriod();
        periodSelect.addEventListener('change', function(){
            incomePeriodValue.value = appData.calcPeriod();
        })
    },


    addExpensesBlock: function(){
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            expensesPlus.style.display = 'none';
        }
    },
    

    addIncomeBlock: function(){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3){
            incomePlus.style.display = 'none';
        }
    },

    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cachExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cachExpenses !== ''){
               appData.expenses[itemExpenses] = cachExpenses; 
            }
        });
    },


    getIncome: function(){
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = cashIncome; 
            }
        });
    },


    getAddExpenses: function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if (item !== ''){
                appData.addExpenses.push(item);
            }
        });

    },

    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },

 
    getExpensesMonth: function () {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
        }
    },


    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },


    getTargetMonth: function () {
        return targetAmount.value / appData.budgetMonth;
    },


    // getRange: function(event){

    //     console.log(event.type);
    //     console.log(event.target.value);
    //     console.log(periodSelect.value);


    //     console.log(periodAmount);
    //     console.log(periodAmount.innerHTML);

    //     periodAmount.innerHTML = periodSelect.value;
    //     event.target.value = periodSelect.value;
    // },


    // getStatusIncome: function (){
    //     if (appData.budgetDay < 300) {
    //         return ('Низкий уровень дохода');
    //     } else if (appData.budgetDay <= 800) {
    //         return ('Средний уровень дохода');
    //     } else {
    //         return ('Высокий уровень дохода');
    //     }
    // },


    // getInfoDeposit: function() {
    //     if(appData.deposit) {
    //         appData.percentDeposit = prompt('Какой годовой процент', 10);
    //         appData.moneyDeposit = prompt('Какая сумма заложена',10000);
    //     }
    // },


    calcPeriod: function (){
        return appData.budgetMonth * periodSelect.value;
    }
}; 


start.addEventListener('click', appData.start);

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('change', function(){
    periodAmount.innerHTML = periodSelect.value;
});

