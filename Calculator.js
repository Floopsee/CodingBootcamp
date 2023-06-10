window.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById("calc-form");
    if (form) {
        setupIntialValues();
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            update();
        });
    }
});

function getCurrentUIValues() {
    return {
        amount: +(document.getElementById("loan-amount").value),
        years: +(document.getElementById("loan-years").value),
        rate: +(document.getElementById("loan-rate").value),
    }
}

function setupIntialValues() {
    const values = { amount: 10000, years: 10, rate: 4.5 };
    const loanAmount = document.getElementById("loan-amount");
    loanAmount.value = values.amount;
    const numberYears = document.getElementById("loan-years");
    numberYears.value = values.years;
    const interestRate = document.getElementById("loan-rate");
    interestRate.value = values.rate;
    update();
}

function update() {
    const inputValues = getCurrentUIValues();
    updateMonthly(calculateMonthlyPayment(inputValues));
}

function calculateMonthlyPayment(values) {
    const monthlyRate = (values.rate / 100) / 12;
    const n = Math.floor(values.years * 12);
    return (
        (monthlyRate * values.amount) /
        (1 - Math.pow((1 + monthlyRate), -n))
    ).toFixed(2);
}

function updateMonthly(monthly) {
    const monthlyPayment = document.getElementById("monthly-payment");
    monthlyPayment.innerText = "$" + monthly;
}