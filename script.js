function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let displayMeal = "";
        if(data.meals){
            data.meals.forEach(meal => {
                displayMeal = displayMeal + `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "details-btn">Details</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } 
        else{
            displayMeal = "Sorry, can't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = displayMeal;
    });
}

function getMealIngredients(e){
    e.preventDefault();
    if(e.target.classList.contains('details-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealDetailsInfo(data.meals));
    }
}

function mealDetailsInfo(meal){
    console.log(meal);
    meal = meal[0];
    let displayMeal = `
        <div class = "meal-details-img">
        <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <div class = "details-ingredients">
            <h3>Ingredients</h3> 
        </div>
        <ul class="list-unstyled mb-0">
            <li><i class="icon-check icons"></i> ${meal.strIngredient1}</li>
            <li><i class="icon-check icons"></i> ${meal.strIngredient2}</li>
            <li><i class="icon-check icons"></i> ${meal.strIngredient3}</li>
            <li><i class="icon-check icons"></i> ${meal.strIngredient4}</li>
            <li><i class="icon-check icons"></i> ${meal.strIngredient5}</li>
            <li><i class="icon-check icons"></i> ${meal.strIngredient6}</li>
        </ul>
    `;
    mealDetailsContent.innerHTML = displayMeal;
    mealDetailsContent.parentElement.classList.add('showDetails');
}
const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const detailsCloseBtn = document.getElementById("details-close-btn");

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealIngredients);
detailsCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showDetails');
});