const basketRef = document.getElementById("basket");
let basket = [];

function formatCurrency(amount) {
    return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(amount);
}

//#region rendern der Kategorien, Gerichte und Warenkorb beim laden der Seite
function init() {
    renderCategories();
    renderBasket();
}

function renderCategories() {
    const renderCategoriesRef = document.getElementById("menuCategories");
    renderCategoriesRef.innerHTML = "";

    for (let i = 0; i < menuCategories.length; i++) {
        renderCategoriesRef.innerHTML += renderCategoriesTemp(i);
        let dish = renderDishes(i);
        const dishesContainerRef = document.getElementById(`dishesContainer${i}`);

        dishesContainerRef.innerHTML = dish;
    }
}

function renderDishes(i) {
    let dishes = "";

    for (let j = 0; j < menuCategories[i].dishes.length; j++) {
        dishes += renderDishesTemp(i, j);
    }
    return dishes;
}

function renderBasket() {
    basketRef.innerHTML = "";

    if (basket.length === 0) {
        basketRef.innerHTML = renderBasketTextTemp();
        return;
    }
    basketRef.innerHTML = renderBasketWrapperTemp();
    renderBasketCalc();
}
//#endregion

//#region hinzufügen in den Warenkorb und löschen
function addToBasket(i, j) {
    let selectDish = menuCategories[i].dishes[j];
    let foundIndex = basket.findIndex((item) => item.name === selectDish.name);
    if (foundIndex > -1) {
        basket[foundIndex].amount++;
        updateBasketValues(foundIndex);
    } else {
        basket.push({
            name: selectDish.name,
            price: selectDish.price,
            amount: 1,
        });
        changeAmountNav();
        renderBasket();
    }
}

function deleteDish(i) {
    basket.splice(i, 1);
    changeAmountNav();
    renderBasket();
}
//#endregion

//#region verändern und schließen des mobilen Warenkorbes
function toggleMobileBasket() {
    renderBasket();

    const navBasketWrapperRef = document.getElementById("basket-wrapper");
    navBasketWrapperRef.classList.toggle("active");

    if (navBasketWrapperRef.classList.contains("active")) {
        document.body.classList.add("basket-open");
    } else {
        document.body.classList.remove("basket-open");
    }
}

function closeMobileBasket() {
    const wrapper = document.getElementById("basket-wrapper");

    if (wrapper) {
        wrapper.classList.remove("active");
    }

    const basketInside = document.getElementById("basket");
    if (basketInside) {
        basketInside.classList.remove("active");
    }
    document.body.classList.remove("basket-open");
}
//#endregion

//#region rendern der Berechnung der Zahlen im Warenkorb
function renderBasketCalc() {
    const basketCalcRef = document.getElementById("basket-card-wrapper");
    basketCalcRef.innerHTML = "";

    let subtotal = 0;
    for (let i = 0; i < basket.length; i++) {
        let item = basket[i];
        let itemTotal = item.price * item.amount;
        subtotal += itemTotal;
        basketCalcRef.innerHTML += renderBasketCardTemp(i, item, itemTotal);
    }

    delivTotal(subtotal);
}

function delivTotal(subtotal) {
    let deliveryFee = 4.99;
    if (subtotal > 60) {
        deliveryFee = 0;
    }
    let total = subtotal + deliveryFee;
    basketRef.innerHTML += renderBasketPricesTemp(subtotal, deliveryFee, total);
}

function updateBasketValues(i) {
    let item = basket[i];
    if (!item) {
        const card = document.getElementById(`basketCards(${i})`);
        if (card) {
            card.remove();
        }
        recalculateTotals();
        return;
    }
    let itemTotal = item.price * item.amount;
    document.getElementById(`basketAmount${i}`).innerText = item.amount;
    document.getElementById(`itemTotal${i}`).innerText = formatCurrency(itemTotal);
    recalculateTotals();
    changeAmountNav();
}

function recalculateTotals() {
    let subtotal = 0;

    for (let i = 0; i < basket.length; i++) {
        subtotal += basket[i].price * basket[i].amount;
    }
    document.getElementById("subtotal").innerText = formatCurrency(subtotal);
    let deliveryFee;
    if (subtotal > 60 || subtotal === 0) {
        deliveryFee = 0;
    } else {
        deliveryFee = 4.99;
    }

    recalculateDelivTotal(subtotal, deliveryFee);
}

function recalculateDelivTotal(subtotal, deliveryFee) {
    let total = subtotal + deliveryFee;

    if (deliveryFee === 0) {
        document.getElementById("deliveryFee").innerText = 0;
    } else {
        document.getElementById("deliveryFee").innerText = formatCurrency(deliveryFee);
    }

    document.getElementById("total").innerText = formatCurrency(total);
}
//#endregion

//#region ändern der Anzahl im Warenkorb und Symbol
function changeAmount(index, change) {
    basket[index].amount += change;

    if (basket[index].amount <= 0) {
        basket.splice(index, 1);
        changeAmountNav();
        renderBasket();
    } else {
        updateBasketValues(index);
    }
}

function changeAmountNav() {
    const shopCardAmount = document.getElementById("amount-nav-card");
    let sumAmounts = 0;
    // if (basket.length === 0) return;

    for (let i = 0; i < basket.length; i++) {
        sumAmounts += basket[i].amount;
    }

    shopCardAmount.innerText = sumAmounts;
    shopCardAmount.classList.toggle("opened", sumAmounts > 0);
}
//#endregion

//#region kaufen aus dem, leeren und schließen des Warenkorbes
function renderBuy() {
    let orderRef = document.getElementById("basket");

    if (!document.getElementById("orderDialog")) {
        orderRef.innerHTML += renderBuyTemp();
    }

    const dialog = document.getElementById("orderDialog");
    dialog.showModal();
    document.body.classList.add("basket-open");
}

function renderBuyClose() {
    const dialog = document.getElementById("orderDialog");
    if (dialog) {
        dialog.close();
    }

    const navBasketWrapperRef = document.getElementById("basket-wrapper");
    if (navBasketWrapperRef) {
        navBasketWrapperRef.classList.remove("active");
    }
    document.body.classList.remove("basket-open");

    basket = [];
    changeAmountNav();
    renderBasket();
}

//#endregion
