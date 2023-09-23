function recipes() {
	// Variables
	// DOM
	const recipesEmplacement = document.querySelector('section.recettes'); // Emplacement où seront placé les différentes recettes

	// Fonction
	// Affichage des recettes
	function displayRecipes() {
		recipesCurrent.forEach((recipe) => {
			const recipesModel = recipesTemplate(recipe);
			const recipesDOM = recipesModel.recipesDOM();
			recipesEmplacement.appendChild(recipesDOM);
		});
	}

	return { displayRecipes };
}
