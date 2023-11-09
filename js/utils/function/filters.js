/*--------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------function filters-------------------------------------------------*/
/*----------------------------------------fonction gérant les filtres-------------------------------------------*/
/*---------------------------------------------par Camille CRAPAT-----------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------*/

function filters() {
	// VARIABLES

	// VARIABLES concernant filter
	// DOM
	const numberOfRecipes = document.querySelector('div.numberOfRecipes'); // On récupère la zone affichant le nombre de recette affichées pour affiché les filtres par la suite avant cet élèment
	const filter = document.querySelectorAll('div.filter'); // On selectionne les filtres

	// VARIABLES concernant filterSelect
	// DOM
	const filtersSelect = document.querySelector('.filtersSelect'); // On selectionne les filtres selectionnées
	const li = document.querySelectorAll('li.option'); // On selectionne les élèments de listes des filtres

	// EVENEMENTS

	// EVENEMENTS concernant filter
	// Click sur un block filtre
	filter.forEach((fil) => {
		// On parcours les filtres
		const filterName = fil.querySelector('div.filter__name'); // On récupère le nom des filtres
		const option = fil.querySelector('div.filter__options'); // On récupère l'emplacement contenant les listes
		filterName.addEventListener('click', () => {
			// Si on click sur le nom d'un filtre
			toogleFilter(fil, option); // On charge la fonction ouvrant / fermant le filtre
		});
	});

	// EVENEMENTS concernant filterSelect
	// Clique sur un li
	li.forEach((li) => {
		// On parcours tous les li
		li.addEventListener('click', (e) => {
			// Lorsqu'on clcik sur un li
			e.stopImmediatePropagation();
			addFilterSelected(li); // On charge la fonction permettant de transformer l'élèment selectionné en filtre selectionné
			// search().searchVerif('addingFilter'); // On charge l'algorythme de recherche
		});
	});

	// FONCTIONS

	// FONCTIONS concernant filter
	// Initialisation des filters avant affichage
	function initFilters() {
		ingredientsFilter.length = 0; // On passe le tableau des filtes pour les ingredients à 0
		ustensilsFilter.length = 0; // On passe le tableau des filtres pour les ustensils à 0
		appliancesFilter.length = 0; // On passe le tableau des filtres pour les appareils à 0
		recipesDisplay.forEach((recipe) => {
			// On parcourt les recettes affichées
			if (recipe !== undefined) {
				// Si la recette qui est parcouru existe
				recipe.ingredients.forEach((ingredient) => {
					// On parcourt les ingrédients de la recette
					if (
						ingredientsFilter.indexOf(ingredient.ingredient.toLowerCase()) === -1 &&
						ingredientsSelect.indexOf(ingredient.ingredient.toLowerCase()) === -1
					) {
						// Si on ne trouve pas l'élèment dans ingredientFilter et dans ingredientSelect
						ingredientsFilter.push(ingredient.ingredient.toLowerCase()); // On l'ajoute
					}
				});
				recipe.ustensils.forEach((ustensil) => {
					// On parcourt les ustensils de la recette
					if (
						ustensilsFilter.indexOf(ustensil.toLowerCase()) === -1 &&
						ustensilsSelect.indexOf(ustensil.toLowerCase()) === -1
					) {
						// Si on ne trouve pas l'élèment dans ustensilsFilter et dans ustensilsSelect
						ustensilsFilter.push(ustensil.toLowerCase()); // On l'ajoute
					}
				});

				if (
					appliancesFilter.indexOf(recipe.appliance.toLowerCase()) === -1 &&
					appliancesSelect.indexOf(recipe.appliance.toLowerCase()) === -1
				) {
					// Si on ne trouve pas l'élèment dans applianceFilter et dans applianceSelect
					appliancesFilter.push(recipe.appliance.toLowerCase()); // On l'ajoute
				}
			}
		});
	}

	// Tri des filtres par odre alphabétique
	function sortFilters() {
		ingredientsFilter.sort();
		ustensilsFilter.sort();
		appliancesFilter.sort();
	}

	// Chargement de l'affichage des filtres
	function displayFilters() {
		const typeRecipes = [
			{ type: 'Ingrédients', css: 'ingredients', data: ingredientsFilter },
			{ type: 'Appareils', css: 'appareils', data: appliancesFilter },
			{ type: 'Ustensiles', css: 'ustensiles', data: ustensilsFilter },
		]; // On créer un tableau pour afficher les filtres avec les bonnes données
		typeRecipes.forEach((typeRecipe) => {
			// On parcourt ce tableau
			const filterModel = filterTemplate(typeRecipe.type, typeRecipe.css, typeRecipe.data); // On envoi l'élèment dans le template des filtres
			const filterDOM = filterModel.filterDOM(); // On créer l'élèment
			numberOfRecipes.before(filterDOM); // On l'affiche dans le DOM
		});
	}

	// Ouverture et fermeture de filter
	function toogleFilter(fil, option) {
		if (option.classList.contains('open') && fil.classList.contains('open')) {
			// Si le filtre est ouvert
			closeFilter(fil, option); // On le ferme
		} else {
			// Sinon
			openFilter(fil, option); // On l'ouvre
		}
		// sous fonction permettant d'ouvrir le filtre
		function openFilter(fil, options) {
			options.classList.add('open'); // On ajoute la classe open aux options
			fil.classList.add('open'); // On ajoute la classe open au filtre
		}
		// sous fonction permettant de fermer le filtre
		function closeFilter(fil, options) {
			options.classList.remove('open'); // On enlève la classe open aux options
			fil.classList.remove('open'); // On enlève la classe open au filtre
		}
	}

	// FONCTIONS concernant filterSelect
	// Ajout d'un filter select
	function addFilterSelected(el) {
		switch (
			el.classList[1] // On vérifie à quel type de filtre il apaprtient
		) {
			case 'ingredients': // Si c'est ingrédients
				ingredientsFilter.splice(ingredientsFilter.indexOf(el.textContent), 1); // On supprime l'élèment du tableau ingredientsFilter
				ingredientsSelect.push(el.textContent); // On ajoute l'élèment au tableau ingredientsSelect
				break;
			case 'appareils': // Si c'est appareils
				appliancesFilter.splice(appliancesFilter.indexOf(el.textContent), 1); // On supprime l'élèment du tableau applaincesFilter
				appliancesSelect.push(el.textContent); // On ajoute l'élèment au tableau appliancesSelect
				break;
			case 'ustensiles': // Si c'est ustensils
				ustensilsFilter.splice(ustensilsFilter.indexOf(el.textContent), 1); // On supprime l'élèment du tableau ustensilsFilter
				ustensilsSelect.push(el.textContent); // On ajoute l'élèment au tableau ustensilsSelect
				break;
		}
		el.remove(); // On supprime l'élèment de la liste dans les filtres
		const fitlerSelectModel = filterSelectedTemplate(el.textContent, el.classList[1]); // On créer l'élèment select
		const filterSelectDOM = fitlerSelectModel.filterSelectedDOM();
		filtersSelect.appendChild(filterSelectDOM);
		closeAllFilters(); // On ferme tous les filtres
		reloadEvent(); // On recharge les élèments
	}

	// Fermeture de tous les filters
	function closeAllFilters() {
		const isOpen = document.querySelectorAll('.open'); // On selectionne les élèments qui contiennent la classe open
		const inputs = document.querySelectorAll('.search-filter'); // On récupère les champs de recherche des filtres
		inputs.forEach((input) => {
			// On les parcourt
			search().eraseInput('filters', input); // On efface la valeur du champs
		});
		if (isOpen.length > 0) {
			// Si il y a des élèments ouvert
			isOpen.forEach((isOpen) => {
				// On les parcours
				isOpen.classList.remove('open'); // On les ferme
			});
		}
	}

	// Rechargement des évènements après changement dans le DOM
	function reloadEvent() {
		const filterSelect = document.querySelectorAll('.filterSelect'); // On récupère les filtres selectionnés
		// Click sur un filtre selctionné
		filterSelect.forEach((el) => {
			// On les parcourt
			el.addEventListener('click', (e) => {
				// Si on click dessus
				e.stopImmediatePropagation();
				delteFilterSelected(el); // On supprime le filtreSelect
				// search().searchVerif('deleteFilter'); // On réinitialise l'algorythme de recherche
			});
		});

		const li = document.querySelectorAll('li'); // On récupère les élèments de listes des filtres
		li.forEach((el) => {
			// On les parcours
			el.addEventListener('click', (e) => {
				// Lorsqu'on click dessus
				e.stopImmediatePropagation();
				addFilterSelected(el); // On ajoute un filtre selectionné
				// search().searchVerif('addingFilter'); // On lance l'algorytme de recherche
			});
		});
	}

	// Suppression d'un filter qui est selectionné
	function delteFilterSelected(el) {
		switch (
			el.classList[1] // Si l'élèment contient la class
		) {
			case 'ingredients': // ingrédients
				const filterLiDOMIngredients = filterTemplate().filterLiDOM(el.textContent, 'ingredients'); // On créer l'élèments
				document.querySelector('.filter.ingredients').querySelector('ul').appendChild(filterLiDOMIngredients); // On l'ajoute dans les filtres
				ingredientsSelect.splice(ingredientsSelect.indexOf(el.textContent), 1); // On supprime l'élèment dans le tableau ingredientsSelect
				ingredientsFilter.push(el.textContent); // On l'ajoute dans ingredientsFilter
				break;
			case 'appareils': // appareils
				const filterLiDOMAppliance = filterTemplate().filterLiDOM(el.textContent, 'appareils'); // On créer l'élèments
				document.querySelector('.filter.appareils').querySelector('ul').appendChild(filterLiDOMAppliance); // On l'ajoute dans les filtres
				appliancesSelect.splice(appliancesSelect.indexOf(el.textContent), 1); // On supprime l'élèment dans le tableau appliancesSelect
				appliancesFilter.push(el.textContent); // On l'ajoute dans applianceFilter
				break;
			case 'ustensiles': // ustensiles
				const filterLiDOMUstensils = filterTemplate().filterLiDOM(el.textContent, 'ustensiles'); // On créer l'élèments
				document.querySelector('.filter.ustensiles').querySelector('ul').appendChild(filterLiDOMUstensils); // On l'ajoute dans les filtres
				ustensilsSelect.splice(ustensilsSelect.indexOf(el.textContent), 1); // On supprime l'élèment dans le tableau ustensilsFilter
				ustensilsFilter.push(el.textContent); // On l'ajoute dans ustensilsSelect
				break;
		}
		el.remove(); // On supprime l'élèment
		reloadEvent(); // On recharge les élèments
	}

	return { initFilters, sortFilters, displayFilters, reloadEvent };
}
