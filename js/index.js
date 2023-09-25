function init() {
	filters().initFilters();
	filters().sortFilters();
	filters().displayFilters();
	filters();
	recipes().displayRecipes(); // Chargement des recettes

	//numberOfRecipes.textContent = `${recipes.length} recette${recipes.length > 1 ? 's' : ''}`;
}
init();
