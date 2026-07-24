function renderCategoriesTemp(i, j){
    return /*html*/`
        <section class="burgerAndSandwiches">
            <div class="categorie-burger">
                <img src="${menuCategories[i].icon[j]}" alt="Cartoon Burger">
                <p>${menuCategories[i].Category}</p>
            </div>
            <div class="dishes-names">
                <img src="./assets/images/${menuCategories[i].dishes[j].image}" alt="${menuCategories[i].dishes[j].name}">
                <h3>${menuCategories[i].dishes[j].name}</h3>
                <p>${menuCategories[i].dishes[j].insied}</p>
            </div>
            <div class="price-add">
                <p>${menuCategories[i].dishes[j].price}</p>
                <button onclick="addToBasket">+</button>
            </div>
        </section>
    `
}