/*--------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------function recipes-------------------------------------------------*/
/*----------------------------------------fonction gérant les recettes------------------------------------------*/
/*---------------------------------------------par Camille CRAPAT-----------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------*/

function recipes() {
	// VARIABLES
	// DOM
	const recipesEmplacement = document.querySelector('section.recettes'); // Emplacement où seront placé les différentes recettes

	// FONCTIONS
	// Affichage des recettes
	function displayRecipes() {
		recipesDisplay.forEach((recipe) => {
			// On parcours le tableau des recettes affichées
			const recipesModel = recipesTemplate(recipe); // On envoi les données de la recette au tempalte
			const recipesDOM = recipesModel.recipesDOM(); // On stock la création de la recette en DOM
			recipesEmplacement.appendChild(recipesDOM); // On l'ajoute au DOM
		});
	}

	return { displayRecipes };
}
