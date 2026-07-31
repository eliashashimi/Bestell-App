const basketRef = document.getElementById("basket");

function formatCurrency(amount) {
    return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(amount);
}

let basket = [];

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
        renderBasket();
    }

    if (window.innerWidth <= 1200) {
        document.getElementById("basket-wrapper").classList.add("active");
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

function toggleMobileBasket() {
    renderBasket();

    const navBasketWrapperRef = document.getElementById("basket-wrapper");
    navBasketWrapperRef.classList.toggle("active");
}
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

    let deliveryFee = 4.99;

    if (subtotal > 60) {
        deliveryFee = 0;
    }

    let total = subtotal + deliveryFee;

    basketRef.innerHTML += renderBasketPricesTemp(subtotal, deliveryFee, total);
}

function changeAmount(index, change) {
    basket[index].amount += change;

    if (basket[index].amount <= 0) {
        basket.splice(index, 1);
        renderBasket();
    } else {
        updateBasketValues(index);
    }
}

function deleteDish(i) {
    basket.splice(i, 1);

    renderBasket();
}

function renderBuy() {
    let orderRef = document.getElementById("basket");

    if (!document.getElementById("orderDialog")) {
        orderRef.innerHTML += renderBuyTemp();
    }

    const dialog = document.getElementById("orderDialog");
    dialog.showModal();
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

    basket = [];
    renderBasket();
}
// die Funktion soll den den wert der Dishes Karten aktualisieren und nicht den ganzen Basket
function updateBasketValues(i) {
    let item = basket[i];

    // es muss überprüft werden ob dieses dish existiert
    if (!item) {
        const card = document.getElementById(`basketCards(${i})`);
        if (card) {
            card.remove();
        }
        recalculateTotal();
        return;
    }

    let itemTotal = item.price * item.amount;

    document.getElementById(`basketAmount${i}`).innerText = item.amount;
    document.getElementById(`itemTotal${i}`).innerText = formatCurrency(itemTotal);

    // hier muss neu berechnet werden
    recalculateTotals();
}

// function die nur die unteren Preise im Warenkorb ändert
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

    let total = subtotal + deliveryFee;

    // hier sollten die ID`S angesprochen und einzelnd geändert werden mit der kalkulation von deliveryFee
    if (deliveryFee === 0) {
        document.getElementById("deliveryFee").innerText = 0;
    } else {
        document.getElementById("deliveryFee").innerText = formatCurrency(deliveryFee);
    }

    document.getElementById("total").innerText = formatCurrency(total);
}
