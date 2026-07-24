// übergreifende function die beim laden ausgeführt wird
function init() {
    renderCategories();
    renderDishes();
}

// Funktion die die Kategorien ausführt
function renderCategories() {
    const renderDishesRef = document.getElementById("menuCategories");
    renderDishesRef.innerHTML = "";

    for (let i = 0; i < menuCategories.length; i++) {
        renderDishesRef.innerHTML += renderCategoriesTemp(i);
        
    }
}

function renderDishes() {
    const renderCategoriesRef = document.getElementById("menuCategories");
    
    renderCategoriesRef.innerHTML = "";

    for (let i = 0; i < menuCategories.length; i++) {

        for (let j = 0; j < menuCategories[i].dishes.length; j++) {
            renderCategoriesRef.innerHTML += renderDishesTemp(i, j);
        }
        
    }
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

// 