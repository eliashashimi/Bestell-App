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
        <section id="basketCards${i}" class="basket-card">
            <div class="dish-name-basket">
                <h2 id="basketTitle${i}">${item.name}</h2>
                <img src="./assets/icons/delete.png" onclick="deleteDish(${i})" alt="Löschen Mülleimer">
            </div>
            <div class="basket-amount-calc">
                <button class="minus-btn" onclick="changeAmount(${i}, -1)">-</button>
                <span id="basketAmount${i}" class="basket-amount">${item.amount}</span>
                <button class="plus-btn" onclick="changeAmount(${i}, 1)">+</button>
            </div>
            <p id="itemTotal${i}" class="item-total-price">${formatCurrency(itemTotal)}</p>
        </section>
    `
}
function renderBasketPricesTemp(subtotal, deliveryFee, total) {
    return /*html*/`
        <section class="calc-price-basket">
            <div class="subtotal">
                <p>Subtotal</p>
                <p id="subtotal">${formatCurrency(subtotal)}</p>
            </div>
            <div class="delivery-fee">
                <p>Delivery Fee</p>
                <p id="deliveryFee">${formatCurrency(deliveryFee)}</p>
            </div>
            <div class="total">
                <p><strong>Total</strong></p>
                <p><strong id="total">${formatCurrency(total)}</strong></p>
            </div>
            <div>
                <button id="buyBtn" class="buy-btn" onclick="renderBuy()">Buy now</button>
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
                <p>Nothing here yet. Go ahead and choose something delicious!</p>
            </div>
            <div>
                <img src="./assets/icons/shopping_cart.png" alt="Shopping Cart">
            </div>
        </section>
    `
}

function renderBuyTemp() {
    return /*html*/`
            <dialog id="orderDialog" class="order-dialog">
                <button id="closeOrderBtn" class="close-order-btn" onclick="renderBuyClose()">x</button>
                <div class="dialog-content">
                    <img src="./assets/icons/Delivery-Car.png" alt="Delivery Car Icon">
                    <div class="ordConfirmed">
                        <h2>Order confirmed</h2>
                        <h3>Your food is on the way</h3>
                    </div>
                </div>
            </dialog>
    `
}