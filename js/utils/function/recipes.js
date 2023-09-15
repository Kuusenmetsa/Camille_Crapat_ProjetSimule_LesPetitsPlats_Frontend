function recipes() {
	// Variables
	// DOM
	const recipesEmplacement = document.querySelector('section.recettes');

	// Fonction
	// Affichage des recettes
	function displayRecipes() {
		recipesData.forEach((recipe) => {
			const recipesModel = recipesTemplate(recipe);
			const recipesDOM = recipesModel.recipesDOM();
			recipesEmplacement.appendChild(recipesDOM);
		});
	}

	return { displayRecipes };
}
