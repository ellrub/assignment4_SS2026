/*
Mapping from MealDB Categories to TheCocktailDB drink ingredient
You can customize or expand this object to suit your needs.
*/
const mealCategoryToCocktailIngredient = {
    Beef: "whiskey",
    Chicken: "gin",
    Dessert: "amaretto",
    Lamb: "vodka",
    Miscellaneous: "vodka",
    Pasta: "tequila",
    Pork: "tequila",
    Seafood: "rum",
    Side: "brandy",
    Starter: "rum",
    Vegetarian: "gin",
    Breakfast: "vodka",
    Goat: "whiskey",
    Vegan: "rum",
    // Add more if needed; otherwise default to something like 'cola'
};

/*
    2) Main Initialization Function
        Called on page load to start all the requests:
        - Fetch random meal
        - Display meal
        - Map meal category to spirit
        - Fetch matching (or random) cocktail
        - Display cocktail
*/
function init() {
    fetchRandomMeal()
        .then((meal) => {
            displayMealData(meal);
            const spirit = mapMealCategoryToDrinkIngredient(meal.strCategory);
            return fetchCocktailByDrinkIngredient(spirit);
        })
        .then((cocktail) => {
            displayCocktailData(cocktail);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

/*
    Fetch a Random Meal from TheMealDB
    Returns a Promise that resolves with the meal object
 */
function fetchRandomMeal() {
    // Fill in
    const randomMealAPI = `https://www.themealdb.com/api/json/v1/1/random.php`
    return fetch(randomMealAPI)
        .then((response) => response.json())
        .then((data) => data.meals[0])
}

/*
Display Meal Data in the DOM
Receives a meal object with fields like:
    strMeal, strMealThumb, strCategory, strInstructions,
    strIngredientX, strMeasureX, etc.
*/
function displayMealData(meal) {
    // Fill in
    const mealContainer = document.getElementById("meal-container")
    const ingredientsArray = []
    const measureArray = []
    const instructionsArray = meal.strInstructions.split(/\r?\n+/)

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal["strIngredient" + i]
        const measure = meal["strMeasure" + i]

        if (ingredient && ingredient.trim() !== "") {
            ingredientsArray.push(ingredient.trim())
            measureArray.push(measure.trim())
        }
    }
    mealContainer.innerHTML = `
        <div class="container">
            <img src="${meal.strMealThumb}">
            <div>
                <h2>${meal.strMeal}</h2>
                <p>${meal.strCategory}</p>
                <div class="container__list">
                    <ul>
                        ${ingredientsArray.map(item => `<li>${item}</li>`).join("")}
                    </ul>
                    <ul class="list__measure">
                        ${measureArray.map(item => `<li>${item}</li>`).join("")}
                    </ul>
                </div>
            </div>
        </div>
        <ol>
            ${instructionsArray.map(item => `<li>${item}</li>`).join("")}
        </ol>

    `
}

/*
Convert MealDB Category to a TheCocktailDB Spirit
Looks up category in our map, or defaults to 'cola'
*/
function mapMealCategoryToDrinkIngredient(category) {
    if (!category) return "cola";
    return mealCategoryToCocktailIngredient[category] || "cola";
}

/*
Fetch a Cocktail Using a Spirit from TheCocktailDB
Returns Promise that resolves to cocktail object
We call https://www.thecocktaildb.com/api/json/v1/1/search.php?s=DRINK_INGREDIENT to get a list of cocktails
Don't forget encodeURIComponent()
If no cocktails found, fetch random
*/
function fetchCocktailByDrinkIngredient(drinkIngredient) {
    // Fill in
    const cocktailAPI = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(drinkIngredient)}`
    return fetch(cocktailAPI)
        .then((response) => response.json())
        .then((data) => {
            if (data.drinks && data.drinks.length > 0) {
                return data.drinks[0]
            }
            return fetchRandomCocktail()
        })
}

/*
Fetch a Random Cocktail (backup in case nothing is found by the search)
Returns a Promise that resolves to cocktail object
*/
function fetchRandomCocktail() {
    // Fill in
    const randomCocktailAPI = `https://www.thecocktaildb.com/api/json/v1/1/random.php`
    return fetch(randomCocktailAPI)
        .then((response) => response.json())
        .then((data) => data.drinks[0])
}

/*
Display Cocktail Data in the DOM
*/
function displayCocktailData(cocktail) {
    // Fill in
    const cocktailContainer = document.getElementById("cocktail-container")
    const ingredientsArray = []
    const measureArray = []
    const instructionsArray = cocktail.strInstructions.split(/\r?\n+/)

    for (let i = 1; i <= 15; i++) {
        const ingredient = cocktail["strIngredient" + i]
        const measure = cocktail["strMeasure" + i]

        if (ingredient !== null) {
            ingredientsArray.push(ingredient)
        }
        if (measure !== null) {
            measureArray.push(measure)
        }
    }
    cocktailContainer.innerHTML = `
        <div class="container">
            <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
            <div>
                <h2>${cocktail.strDrink}</h2>
                <p>${cocktail.strCategory}</p>
                <div class="container__list">
                    <ul>
                        ${ingredientsArray.map(item => `<li>${item}</li>`).join("")}
                    </ul>
                    <ul class="list__measure">
                        ${measureArray.map(item => `<li>${item}</li>`).join("")}
                    </ul>
                </div>
            </div>
        </div>
        <ol>
            ${instructionsArray.map(item => `<li>${item}</li>`).join("")}
        </ol>
    `
}

/*
Call init() when the page loads
*/
window.onload = init;
