// capturing the dom data
const searchButton = document.getElementById('search');
searchButton.addEventListener('click', function () {
    const typeFood = document.getElementById('meal').value;
    getFoodData(typeFood);
})
// fetching the API
const getFoodData = foodName => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log('response',data);
            if(data.meals != null){
                displayFoodItem(data.meals);
            }else{
                alert('please enter some data');
            }
        })
}
//displaying the items
const displayFoodItem = mealItems => {
    const foodContainer = document.getElementById('food-container');
    mealItems.forEach(item => {
        const foodItemName = document.createElement('div');
        foodItemName.className = 'meal-item';
        itemPosition = item.idMeal;
        const foodInfo = `
        <img src ="${item.strMealThumb}">
        <h3>${item.strMeal}</h3>
        `
        foodItemName.innerHTML = foodInfo;
        foodItemName.addEventListener('click', function () {
            mealDetails(item.idMeal);
        });
        foodContainer.appendChild(foodItemName);
    });
    document.getElementById('meal').value = '';

}
//fetching tha data for each item
const mealDetails = id => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log('response',data);
            if(data.meals != null){
                displayDetails(data.meals);
            }else{
                alert('please enter some data');
            }
        })
}
//displaying the data for each item
const displayDetails = mealfoodDetails => {
    const foodDetails = document.getElementById('food-details');
    mealfoodDetails.forEach(item => {
        const foodDetail = document.createElement('div');
        foodDetail.className = 'meal-details';
        console.log(item.strMeal);
        const itemName = document.createElement('h1');
        const ingredients = document.createElement('h4');
        ingredients.innerText = 'Ingredients';
        itemName.innerText = item.strMeal;
        const ul = document.createElement('ul');
        const imgUrl = document.createElement('img');
        imgUrl.src = item.strMealThumb;
        foodDetail.appendChild(imgUrl);

        const ingredientsItems = [item.strIngredient1,item.strIngredient2,item.strIngredient3,item.strIngredient4,
            item.strIngredient5,item.strIngredient6,item.strIngredient7,item.strIngredient8,item.strIngredient9,item.strIngredient10,
            item.strIngredient11,item.strIngredient12,item.strIngredient13,item.strIngredient14,item.strIngredient15,item.strIngredient16,
            item.strIngredient17,item.strIngredient18,item.strIngredient19,item.strIngredient20];
        ingredientsItems.forEach(item =>{
            const li = document.createElement('li');
            if(item != null && item != ''){
                li.innerText = item;
                ul.appendChild(li);
            } 
        })
        foodDetail.appendChild(itemName);
        foodDetail.appendChild(ingredients);
        foodDetail.appendChild(ul);
        foodDetails.appendChild(foodDetail);
    });
}

