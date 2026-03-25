# Front-End Development, MIX114 - Assignment 4

This is a group home assignment.


In this home assignment, you need to create a meal-to-drink matching application. You will use two public WebAPIs to retrieve the necessary information and display it on a webpage.
First, your application will request a random meal from the MealDB and display the meal’s details, including images, ingredients, measurements, and instructions. Then it tries to find a matching cocktail by checking which drink ingredient matches the meal “Category” (e.g., "Chicken", "Beef", "Seafood", etc.) using the provided mapping. If no match is found, it uses "cola" as the drink ingredient. Then it tries to fetch a suitable drink from the cocktaildb search, and if no suitable drink is found, it fetches a random cocktail and displays cocktail details on the webpage next to the meal details.

Below are the individual steps you need to do in the homework. We provide a skeleton on GitHub, that you need to fork into your own repository and then work with your teammate on implementing the assignment. You can fill the code in the skeleton or modify it as you wish. We encourage you to use GitHub for collaboration. Optimally, you can split the task between you, and regularly commit and pull+push your code. You submit the links to your GitHub repository and to the web application published on GitHub Pages.



1. Fork the Provided GitHub Skeleton  
- Use the following GitHub repository link: https://github.com/bachinskim/assignment4_SS2026.git 
- Click the “Fork” button in the top-right corner to create your own copy under your GitHub account.  
- On your forked project page go to Settings->Collaborators->Add people and add your project team members.
- Clone your forked repository to your computer using the GitHub client.

2. Open the Project Locally  
- Open the project folder in vscode.  
- Launch the application in your browser or via a local server.

3. Implement fetching the Random Meal  
- Inside your code (in the provided skeleton file structure), write a function that sends a request to:
     https://www.themealdb.com/api/json/v1/1/random.php
- Explore the structure of JSON using console.log()
- Parse the JSON response and retrieve relevant data about the meal (e.g., `strMeal`, `strMealThumb`, `strInstructions`, `strCategory`, `strIngredients`, `strMeasure` values).
- Display this information on the webpage:
 - Image (e.g., `strMealThumb`)  
 - Name of the meal
 - Category  
 - A table or list of ingredients with their measures  
 - Instructions for cooking  

4. Match a Cocktail by Category  
- Extract the meal’s category (such as `"Chicken"` or `"Beef"`).
- Use this category to find a matching drink ingredient in the provided object mealCategoryToCocktailIngredient using the function mapMealCategoryToDrinkIngredient(category)
- Use this drink ingredient as part of a query to search TheCocktailDB via:
`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkIngredientVariable}`
- If the search response has at least one cocktail, display the first (or a random) match. If no cocktails are found, fetch a random cocktail instead by calling:
     https://www.thecocktaildb.com/api/json/v1/1/random.php
- Show relevant cocktail data on the page (e.g., image, name, and a list of ingredients).

5. Commit and Collaborate  
- Make frequent commits/pushes with clear messages describing each change (e.g., “Added random meal fetch,” “Implemented cocktail search,” etc.).  
- Ensure both you and your teammate commit changes.  

6. (Optional) Improve the application  
- Display any extra meal details, such as YouTube video links for the recipe (if present) as an embedded video.  
- Style the page with additional CSS or frameworks if you wish.
    
7. When you have a working solution, push your final changes to your forked repository and use GitHub pages (GitHub project website->Settings->Pages->Deploy from a branch->main->Save).


9. Submit a link to your forked GitHub repository (with the final code) and a link to your published page on GitHub pages.

Good luck, and enjoy building your Meal + Cocktail matching application!