function init() {
	filters().initFilters();
	filters().sortFilters();
	filters().displayFilters();
	filters();
	search();
	recipes().displayRecipes(); // Chargement des recettes
	const count = document.querySelectorAll('.recettes > article').length;
	const el = document.querySelector('.numberOfRecipes');
	el.textContent = `${count} recette${count > 1 ? 's' : ''}`;
}
init();
