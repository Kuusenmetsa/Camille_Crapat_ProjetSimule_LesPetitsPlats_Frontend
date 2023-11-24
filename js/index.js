/*--------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------function init---------------------------------------------------*/
/*-----------------------------fonction gérant l'initialisation des fonctions-----------------------------------*/
/*---------------------------------------------par Camille CRAPAT-----------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------*/

function init() {
	filters().initFilters(); // On initialise les filtres
	filters().sortFilters(); // On les tri
	filters().displayFilters(); // On les affiche
	filters(); // On charge les fonctions afférant aux filtres
	search(); // On charge les fonctions afférant aux recherches
	recipes().displayRecipes(); // Chargement des recettes
	const count = document.querySelectorAll('.recettes > article').length; // On compte combien il y a de recettes affichées
	const el = document.querySelector('.numberOfRecipes'); // On affiche à l'écran le nombre de recettes affichées
	el.textContent = `${count} recette${count > 1 ? 's' : ''}`;
}
init(); // On charge init
