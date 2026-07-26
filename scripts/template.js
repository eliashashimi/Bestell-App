function renderCategoriesTemp(i) {
    return /*html*/`
        <section>
            <div class="categories">
                <img src="${menuCategories[i].icon}" alt="Icon von ${menuCategories[i].category}">
                <p>${menuCategories[i].category}</p>
            </div>
            <div id="dishesContainer${i}" class="dishesContainer"></div>
        </section>
    `
}

function renderDishesTemp(i, j){
    let dish = menuCategories[i].dishes[j];
    return /*html*/`
        <section >
            <div class="dishes-names">
                <img src="./assets/images/${dish.image}" alt="${dish.name}">
                <h3>${dish.name}</h3>
                <p>${dish.insied}</p>
            </div>
            <div class="price-add">
                <p>${formatCurrency(dish.price)}</p>
                <button onclick="addToBasket(${i}, ${j})">+</button>
            </div>
        </section>
    `
}

function renderBasketCardTemp(i, item, itemTotal) {
    return /*html*/`
        <section class="dish-amount">
            <div class="dish-name-basket">
                <p>${item.name}</p>
                <img src="./assets/icons/delete.png" alt="">
            </div>
            <div class="basket-amount-calc">
                <button class="minus" onclick="changeAmount(${i})", -1>-</button>
                <span>${item.amount}</span>
                <button class="plus" onclick="changeAmount(${i})", 1>+</button>
                <p>${formatCurrency(itemTotal)}</p>
                </div>
        </section>
    `
}
function renderBasketPricesTemp(subtotal, deliveryFee, total) {
    return /*html*/`
        <section class="calc-price-basket">
            <div class="subtotal">
                <p>Subtotal</p>
                <p>${formatCurrency(subtotal)}</p>
            </div>
            <div class="delivery-fee">
                <p>Delivery Fee</p>
                <p>${formatCurrency(deliveryFee)}</p>
            </div>
            <div class="total">
                <p><strong>Total</strong></p>
                <p><strong>${formatCurrency(total)}</strong></p>
            </div>
        </section>
    `
}

function renderBasketTextTemp() {
    return /*html*/`
        <section class="empty-basket">
            <div>
                <h2>Your Basket</h2>
            </div>
            <div>
                <p>Nothin here yet. Go ahead and choose something delicious!</p>
            </div>
            <div>
                <img src="./assets/icons/shopping_cart.png" alt="Shopping Cart">
            </div>
        </section>
    `
}