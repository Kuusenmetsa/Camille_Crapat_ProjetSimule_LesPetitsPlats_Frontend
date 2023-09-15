function init() {
	recipes().displayRecipes(); // Chargement des recettes
	filter().displayFilter(); // Chargement des filtres
	filter(); // Chargement des filtre

	//numberOfRecipes.textContent = `${recipes.length} recette${recipes.length > 1 ? 's' : ''}`;
}
init();
