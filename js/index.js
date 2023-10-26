function init() {
	filters().initFilters();
	filters().sortFilters();
	filters().displayFilters();
	filters();
	search();
	recipes().displayRecipes(); // Chargement des recettes
}
init();
