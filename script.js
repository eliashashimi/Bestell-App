function formatCurrency(amount) {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount);
}

let basket = [];

function init() {
    renderCategories();
    renderBasket();
}

// Funktion die die Kategorien ausführt
function renderCategories() {
    const renderCategoriesRef  = document.getElementById("menuCategories");
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
    let foundDish = basket.find(item => item.name === selectDish.name);

    if(foundDish) {
        foundDish.amount++;
    } else {
        basket.push({
            "name": selectDish.name,
            "price": selectDish.price,
            "amount": 1
        })
    }
    renderBasket();
}

function renderBasket() {
    const basketRef = document.getElementById("basket");
    basketRef.innerHTML = "";

    if (basket.length === 0) {
        basketRef.innerHTML = renderBasketTextTemp();
        return;
    }
    

    let subtotal = 0;

    for (let i = 0; i < basket.length; i++) {
        let item = basket[i];
        let itemTotal = item.price * item.amount;
        subtotal += itemTotal;

        basketRef.innerHTML += renderBasketCardTemp(i, item, itemTotal);
    }

    let deliveryFee = 4.99;
    let total = subtotal + deliveryFee;

    if (subtotal > 60) {
        deliveryFee = 0;
        total = subtotal;
    } else {
        total = subtotal + deliveryFee;
    }


    basketRef.innerHTML += renderBasketPricesTemp(subtotal, deliveryFee, total);
}

function changeAmount(i, change){
    basket[i].amount += change;

    if (basket[i].amount <= 0) {
        basket.splice(i, 1);        
    }

    renderBasket();
}

function deleteDish(i) {
    basket.splice(i, 1);

    renderBasket();
}





// was muss in renderCategories gerendert werden
// woher kommt der inhalt 
// wann und wie lange
// wann und wo wird der inhalt gespeichert setItemToLocalStorage
// wann und wo wird der inhalt abgerufen getItemFromLocalStorage

// function für das hinzufügen der gerichte in den Warenkorb
// wann, wie und wohin wird ein Gericht hinzugefügt
// was wird übergeben durch die function

// function zum entfernen

// function zum löschen der gerichte 
// wann und wo werden gerichte gelöscht

// functtion zum berechnen der Preise
// wo und wann wird der Preis berechnet

// function für das berechnen des gesamt preises
// was wird dazu gerechnet oder abgerechnet
