const billInput = document.getElementById('bill');
const custom = document.getElementById('custom');
const people = document.getElementById('people');
const buttonsTip = document.getElementsByClassName('btnTip');
const reset = buttonsTip[5];
const tip = document.querySelector('.tip h2');
const total = document.querySelector('.total h2');
const msjError = document.getElementsByClassName('msjError')

let billValue = 0;
let tipValue = 0;
let peopleCant = 1;

/* Functions */
function decimalRounding(number, decimal) {
    const factor = 10 ** decimal;
    return Math.round(number * factor) / factor;
}
const totalCalc = () => {
    const tipPerson = (billValue * tipValue) / peopleCant;
    const totalValue = (billValue / peopleCant) + tipPerson;
    total.textContent = '$ ' + decimalRounding(totalValue, 2);
    tip.textContent = '$ ' + decimalRounding(tipPerson, 2);
}
const resetOn = () => {
    reset.disabled = false;
}
const errorPeople = (state) => {
    if (state === 'active') {
        msjError[0].style.display = 'block';
    } else {
        msjError[0].style.display = 'none';
    }
}

const cleanButtons = () => {
    for (let i = 0; i < 5; i++) {
        buttonsTip[i].classList.remove('selected')
    }
};
const cleanCustom = () => {
    custom.value = '';
}
const tipMonitor = () => {
    for (let i = 0; i < 5; i++) {
        buttonsTip[i].addEventListener('click', () => {
            resetOn();
            cleanButtons();
            cleanCustom();
            buttonsTip[i].classList.add('selected')
            const percentage = +buttonsTip[i].textContent.substring(0, buttonsTip[i].textContent.length - 1);
            tipValue = percentage / 100;
            totalCalc();
        })
    }

}
/* Listeners */

tipMonitor();

/* reset */
reset.addEventListener('click', () => {
    billInput.value = '';
    cleanButtons();
    cleanCustom();
    people.value = '';
    tip.textContent = '0.00';
    total.textContent = '0.00';
    billValue = 0;
    tipValue = 0;
    peopleCant = 1;
})

billInput.addEventListener('input', () => {
    resetOn();
    billValue = +billInput.value
    totalCalc();
})

custom.addEventListener('input', () => {
    resetOn();
    cleanButtons();
    tipValue = +custom.value / 100;
    totalCalc();
})

people.addEventListener('input', () => {
    if (+people.value === 0) {
        errorPeople('active')
    } else {
        errorPeople('deactivated');
        resetOn();
        peopleCant = +people.value
        totalCalc();
    }
})
