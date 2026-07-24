function renderCategoriesTemp(i) {
    return /*html*/`
        <section>
            <div class="categories">
                <img src="${menuCategories[i].icon}" alt="Icon von ${menuCategories[i].category}">
                <p>${menuCategories[i].category}</p>
            </div>
        </section>
    `
}

function renderDishesTemp(i, j){
    return /*html*/`
        <section >
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