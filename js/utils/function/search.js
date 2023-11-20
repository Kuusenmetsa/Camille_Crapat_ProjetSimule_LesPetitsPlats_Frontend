/*--------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------function search-------------------------------------------------*/
/*-------------------fonction gérant la recherche dans le champs recherche et dans les filtres------------------*/
/*---------------------------------------------par Camille CRAPAT-----------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------*/

function search() {
	// VARIABLES

	// VARIABLES concernant filter
	// DOM
	const searchInputFilter = document.querySelectorAll('.filter__options__search');

	// VARIABLES concernant search
	// DOM
	const searchInput = document.querySelectorAll('.search');

	// EVENEMENTS

	// EVENEMENTS concernant filter
	// Lorsque l'on tape dans un input // Lorsque on click sur la croix
	searchInputFilter.forEach((search) => {
		const erase = search.querySelector('.filter__options__search__erase');
		const input = search.querySelector('.search-filter');
		input.addEventListener('input', (e) => {
			e.preventDefault();
			if (regex(e.target.value)) {
				getTypeFilter(input, e.target.value); // On applique la recherche dans le filtre
			} else {
				console.log('vous avez saisi un champs incorect');
			}
		});
		erase.addEventListener('click', () => {
			eraseInput('filters', input);
		});
	});

	// EVENEMENTS concernant search
	// Lorsque l'on tape quelque chose dans le champs de recherche // Lorsque l'on click sur la croix
	searchInput.forEach((search) => {
		const erase = search.querySelector('.search__erase');
		const input = search.querySelector('input');
		input.addEventListener('input', (e) => {
			if (regex(e.target.value)) {
				if (e.data !== null) {
					// Si on ajoute un caractère
					searchVerif('addingCharacter');
				} else {
					// Si on eface un caractère
					searchVerif('deleteCharacter');
				}
			} else {
				console.log('vous avez saisi un champs incorect');
			}
		});
		erase.addEventListener('click', () => {
			eraseInput('search', input);
		});
	});

	// FONCTIONS

	// FONCTION concernant filter

	// Récupération du type de filter
	function getTypeFilter(search, value) {
		switch (search.getAttribute('id')) {
			case 'ingredients':
				searchFilter('ingredients', value);
				break;
			case 'appareils':
				searchFilter('appareils', value);
				break;
			case 'ustensiles':
				searchFilter('ustensiles', value);
				break;
		}
		// Sous fonction permettant d'afficher ou non l'élèment de liste
		function searchFilter(type, value) {
			const el = document.querySelectorAll(`.option.${type}`);
			for (i = 0; i < el.length; i++) {
				if (!el[i].textContent.includes(value)) {
					el[i].style.display = 'none';
				} else {
					el[i].style.display = 'flex';
				}
			}
		}
	}

	// FONCTION concernant search
	// Algorythme de recherche
	function searchVerif(type) {
		var value = document.querySelector('.search').querySelector('input').value; // On récupère la valeur du champ de recherches
		if ((type === 'addingCharacter' && value.length > 2) || type === 'addingFilter') {
			// Si un caractère a été ajouté dans l'input et que sa valeur est supérieur à 2 ou si on rajoute un filtre
			const newRecipesDisplay = recipesDisplay.filter(
				(recipe) =>
					(recipe.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
					recipe.description.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
					recipe.ingredients.some((el) => el.ingredient.toLowerCase().indexOf(value.toLowerCase()) !== -1)) &&
						(ustensilsSelect.every(
							(el) => recipe.ustensils.map((e) => e.toLowerCase()).includes(el.toLowerCase())
						) && ingredientsSelect.every(
							(el) => recipe.ingredients.some((e) => e.ingredient.toLowerCase().includes(el.toLowerCase()))
						) &&
						appliancesSelect.every((el) => recipe.appliance.toLowerCase() === el.toLowerCase())) // prettier-ignore
			); // On récupère les recettes correspondant au champ de recherches et aux filtres selectionnés
			recipesDisplay = newRecipesDisplay; // On met à jour le tableau des recettes
			document.querySelectorAll('.recettes > article').forEach((el) => el.remove()); // On supprime les recettes affichées dans le DOM
			recipes().displayRecipes(); // on affiche les recettes à l'écran
			reloadDOM(); // On recharge le DOM
		} else {
			const newRecipesDisplay = recipesData.filter(
				(recipe) => 
				((value.length > 2 && 
					(recipe.name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
					recipe.description.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
					recipe.ingredients.some((el) => el.ingredient.toLowerCase().indexOf(value.toLowerCase()) !== -1))) && 
					(ustensilsSelect.every(
						(el) => recipe.ustensils.map((e) => e.toLowerCase()).includes(el.toLowerCase())
					) && ingredientsSelect.every(
						(el) => recipe.ingredients.some((e) => e.ingredient.toLowerCase().includes(el.toLowerCase()))
					) &&
					appliancesSelect.every((el) => recipe.appliance.toLowerCase() === el.toLowerCase()))) || 
					((value.length <= 2 && (ustensilsSelect.every(
						(el) => recipe.ustensils.map((e) => e.toLowerCase()).includes(el.toLowerCase())
					) && ingredientsSelect.every(
						(el) => recipe.ingredients.some((e) => e.ingredient.toLowerCase().includes(el.toLowerCase()))
					) &&
					appliancesSelect.every((el) => recipe.appliance.toLowerCase() === el.toLowerCase()))))); // prettier-ignore
			recipesDisplay = newRecipesDisplay;
			document.querySelectorAll('.recettes > article').forEach((el) => el.remove()); // On supprime les recettes affichées dans le DOM
			recipes().displayRecipes(); // on affiche les recettes à l'écran
			reloadDOM(); // On recharge le DOM
		}
	}
	// Fonction permettant de recharger les différents élèments et évènements du DOM
	function reloadDOM() {
		const numberOfRecipesDOM = document.querySelectorAll('div.filters > div.filter'); // On récupère tous les blocs filtres
		numberOfRecipesDOM.forEach((el) => {
			// On les parcours
			el.remove(); // On les supprime
		});

		const count = document.querySelectorAll('.recettes > article').length; // On compte le nombre de recettes affichées
		const el = document.querySelector('.numberOfRecipes'); // On se place à l'emplacement contenant le nombre de recette sur le DOM
		el.textContent = `${count} recette${count > 1 ? 's' : ''}`; // On test le pluriel

		filters().initFilters(); // On initalise les filtres (savoir si oui ou non le bloc filtre contient déjà le filtre)
		filters().sortFilters(); // On tri les filtres par ordre alphabétique
		filters().displayFilters(); // On affiche les filtres
		filters().reloadEvent(); // On recherche les élèments du DOM concernant les filtres

		const searchInputFilter = document.querySelectorAll('.filter__options__search'); // On récupère l'élèment bloc de recherche dans les filtres

		searchInputFilter.forEach((search) => {
			// On le parcours
			const erase = search.querySelector('.filter__options__search__erase'); // On selectionne la croix de supression
			const input = search.querySelector('.search-filter'); // On selectionne l'input
			input.addEventListener('input', (e) => {
				// En cas de changement de l'input
				e.preventDefault();
				if (regex(e.target.value)) {
					getTypeFilter(input, e.target.value); // On applique la recherche dans le filtre
				} else {
					console.log('vous avez saisi un champs incorect');
				}
			});
			erase.addEventListener('click', () => {
				// En cas de click sur erase
				eraseInput('filters', input);
			});
		});
	}

	// FONCTION commune
	// Test de la valeur des champs de recherche
	function regex(value) {
		const regexText = /^[a-zA-ZàâäéèêëïîôöùûüçÂ\s\-]+$/;
		if (!regexText.test(value) && value.length > 0) {
			return false;
		}
		return true;
	}

	// Suppression de la valeur du champs recherche dans filtre
	function eraseInput(type, input) {
		input.value = ''; // On passe la valeur de l'input à vide
		if (type === 'filters') {
			// si ça concerne un filtre
			getTypeFilter(input, ''); // On reinitialise la recherche des filtres
		} else {
			// Sinon
			searchVerif('deleteCharacter'); // On réinitialise la recherche
		}
	}

	return { searchVerif, eraseInput }; // On retourne la fonction searchVerif pour la selection des filtres
}
