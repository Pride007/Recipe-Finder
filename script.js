document.getElementById('search-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('search-input').value.trim();
    if (query) {
        searchRecipes(query);
    }
});

async function searchRecipes(query) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your Spoonacular API key or other recipe API key
    const url = `https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&query=${query}&number=6`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayRecipes(data.results);
    } catch (error) {
        console.error('Error fetching recipes:', error);
        alert('Failed to fetch recipes. Please try again later.');
    }
}

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';

    recipes.forEach(recipe => {
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');
        recipeElement.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
            <p><strong>Servings:</strong> ${recipe.servings}</p>
            <a href="${recipe.sourceUrl}" target="_blank">View Recipe</a>
        `;
        recipesContainer.appendChild(recipeElement);
    });
}