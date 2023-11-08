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
			getTypeFilter(input, e.target.value); // On applique la recherche dans le filtre
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
			if (e.data !== null) {
				// Si on ajoute un caractère
				searchVerif('addingCharacter');
			} else {
				// Si on eface un caractère
				searchVerif('deleteCharacter');
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

	// Gestion de la recherche
	function searchVerif(type) {
		const value = document.querySelector('.search').querySelector('input').value; // On récupère la valeur du champ de recherches
		if ((type === 'addingCharacter' && value.length > 2) || type === 'addingFilter') {
			// Si un caractère a été ajouté dans l'input et que sa valeur est supérieur à 2 ou si on ajoute un filtre
			for (i = 0; i < recipesDisplay.length; i++) {
				// On parcourt les recettes affichées
				var searchItsNotOk = true; // On initialise la variable d'état concernant le champs de recherche
				var filterItsNotOk = true; // On initialise la variable d'état concernant les filtres
				if (recipesDisplay[i] !== undefined) {
					// Si la recette qu'on parcourt existe
					if (value.length > 2) {
						// Si le nombre de caractère du champ de recherches est supérioeur à 2
						if (
							recipesDisplay[i].name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
							recipesDisplay[i].description.toLowerCase().indexOf(value.toLowerCase()) !== -1
						) {
							// Si le nom ou la description correspond au champ de recherches
							searchItsNotOk = false; // On change la valeur de la variable d'état
						}
						for (j = 0; j < recipesDisplay[i].ingredients.length; j++) {
							// On parcourt les ingredients de la recette en cours
							if (recipesDisplay[i].ingredients[j].ingredient.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
								// Si un ingredient correspond au champ de recherches
								searchItsNotOk = false; // On change la valeur de la variable d'état
							}
						}
					}
					if (ingredientsSelect.length > 0 || appliancesSelect.length > 0 || ustensilsSelect.length > 0) {
						// Si un filtres est selectionné
						if (ingredientsSelect.length > 0) {
							// Si un filtre ingrédient est selectionné
							for (a = 0; a < ingredientsSelect.length; a++) {
								// On parcourt les filtres d'ingrédients selectionnés
								var filterIngredientsItsOk = false; // On initialise la variable d'état pour les filtres ingrédients
								for (j = 0; j < recipesDisplay[i].ingredients.length; j++) {
									// On parcourt les ingredients de la recette en cours
									if (
										recipesDisplay[i].ingredients[j].ingredient.toLowerCase() === ingredientsSelect[a].toLowerCase()
									) {
										// Si le filtre selectionné correspond à l'ingrédient en cours
										filterIngredientsItsOk = true; // On change la valeur de la varible d'état
										break;
									} else {
										// Sinon
										filterIngredientsItsOk = false; // On change la valeur de la varible d'état
									}
								}
							}
						}
						if (appliancesSelect.length > 0) {
							// Si un filtre appareils est selectionné
							for (a = 0; a < appliancesSelect.length; a++) {
								// On parcourt les filtes appareils selectionés
								var filterApplianceItsOk = false; // On initialise la variable d'état pour les filtres appareils
								if (recipesDisplay[i].appliance.toLowerCase() === appliancesSelect[a].toLowerCase()) {
									// Si le filtre selectionné correspond à un appareil
									filterApplianceItsOk = true; // On change la valeur de la varible d'état
								} else {
									// Sinon
									filterApplianceItsOk = false; // On change la valeur de la varible d'état
								}
							}
						}
						if (ustensilsSelect.length > 0) {
							// Si un filtre ustensils est selectionné
							for (a = 0; a < ustensilsSelect.length; a++) {
								// On parcourt les filtres ustensils selectionnés
								var filterUstensilsItsOk = false; // On initialise la variable d'état pour les filtres ustensils
								for (j = 0; j < recipesDisplay[i].ustensils.length; j++) {
									// On parcourt les ustensils de la recette en cours
									if (recipesDisplay[i].ustensils[j].toLowerCase() === ustensilsSelect[a].toLowerCase()) {
										// Si le filtre selectionné correspond à un ustensils
										filterUstensilsItsOk = true; // On change la valeur de la varible d'état
										break;
									} else {
										// Sinon
										filterUstensilsItsOk = false; // On change la valeur de la varible d'état
									}
								}
							}
						}
						if (ingredientsSelect.length > 0 && ustensilsSelect.length === 0 && appliancesSelect.length === 0) {
							// Si un filtre ingrédient est selectionné
							if (filterIngredientsItsOk) {
								// On vérifie que le filtre soit ok
								filterItsNotOk = false; // Si c'est le cas, on passe la varible d'état sur false
							}
						} else if (ingredientsSelect.length > 0 && appliancesSelect.length > 0 && ustensilsSelect.length === 0) {
							// Si un filtre ingrédient et un filtre appareil est selectionné
							if (filterIngredientsItsOk && filterApplianceItsOk) {
								// On vérifie que les filtres soient ok
								filterItsNotOk = false; // Si c'est le cas, on passe la variable d'etat sur false
							}
						} else if (ingredientsSelect.length > 0 && ustensilsSelect.length > 0 && appliancesSelect.length === 0) {
							// Si un filtre ingredient et un filtre ustensils est selectionné
							if (filterIngredientsItsOk && filterUstensilsItsOk) {
								// On vérifie que les filtres soient ok
								filterItsNotOk = false; // Si c'est le cas, on passe la variable d'état sur false
							}
						} else if (ingredientsSelect.length > 0 && appliancesSelect.length > 0 && ustensilsSelect.length > 0) {
							// Si tous les filtres selectionnés contiennent au moins un élèment
							if (filterIngredientsItsOk && filterUstensilsItsOk && filterApplianceItsOk) {
								// On vérifie que les filtres soient ok
								filterItsNotOk = false; // Si c'est le cas, on passe la variable d'état sur false
							}
						} else if (appliancesSelect.length > 0 && ingredientsSelect.length === 0 && ustensilsSelect.length === 0) {
							// Si un filtre appareil est selectionné
							if (filterApplianceItsOk) {
								// On vérifie que les filtres soient ok
								filterItsNotOk = false; // Si c'est le cas, on passe la variable d'état sur false
							}
						} else if (ustensilsSelect.length > 0 && ingredientsSelect.length === 0 && appliancesSelect.length === 0) {
							// Si un filtre ustensil est selectionné
							if (filterUstensilsItsOk) {
								// On vérifie que les filtres soient ok
								filterItsNotOk = false; // Si c'est le cas, on passe la variable d'état sur false
							}
						}
					}
					if (
						value.length > 2 &&
						(ingredientsSelect.length > 0 || ustensilsSelect.length > 0 || appliancesSelect.length > 0)
					) {
						// Si le champ de recherches contient plus de 2 caractères et qu'au moins un filtre est selectionné
						if (searchItsNotOk || filterItsNotOk) {
							// On vérifie que la recherche et les filtres ne correspondent pas à la recette et si c'est le cas on la supprime
							changeEl('delete', recipesDisplay[i]); // On charge la fonction ajoutant ou supprimant la recette du DOM
							delete recipesDisplay[i]; // On supprime la recette des recettes affichées
						}
					} else if (
						value.length <= 2 &&
						(ingredientsSelect.length > 0 || ustensilsSelect.length > 0 || appliancesSelect.length > 0)
					) {
						// Si le champ de recherches contient moins de 2 caractère et qu'au moins un filtre est selectionné
						if (filterItsNotOk) {
							// On vérifie que les filtres ne correspondent pas à la recette et si c'est le cas on la supprime
							changeEl('delete', recipesDisplay[i]); // On charge la fonction ajoutant ou supprimant la recette du DOM
							delete recipesDisplay[i]; // On supprime la recette des recettes affichées
						}
					} else if (
						value.length > 2 &&
						ingredientsSelect.length === 0 &&
						ustensilsSelect.length === 0 &&
						appliancesSelect.length === 0
					) {
						// Si le champ de recherches contient plus de 2 caractère et qu'aucun filtre n'est selectionné
						if (searchItsNotOk) {
							// On vérifie que la recherche de correspondent pas à la recette et si c'est le cas on la supprime
							changeEl('delete', recipesDisplay[i]); // On charge la fonction ajoutant ou supprimant la recette du DOM
							delete recipesDisplay[i]; // On supprime la recette des recettes affichées
						}
					}
				}
			}
			reloadDOM(); // On recharge le DOM
		} else {
			// Si on supprime un caractère ou qu'on supprime un filtre selectionné
			for (i = 0; i < recipesDelete.length; i++) {
				// On parcourt les recettes supprimées
				var searchItsOk = false; // On initialise la variable d'état concernant le champs de recherche
				var filterItsOk = false; // On initialise la variable d'état concernant les filtres
				if (recipesDelete[i] !== undefined) {
					// Si la recette qu'on parcourt existe
					if (value.length > 2) {
						// Si le nombre de caractère du champ de recherches est supérioeur à 2
						if (
							recipesDelete[i].name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
							recipesDelete[i].description.toLowerCase().indexOf(value.toLowerCase()) !== -1
						) {
							// Si le nom ou la description correspond au champ de recherches
							searchItsOk = true;
						}
						for (j = 0; j < recipesDelete[i].ingredients.length; j++) {
							// On parcourt les ingredients de la recette en cours
							if (recipesDelete[i].ingredients[j].ingredient.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
								// Si un ingredient correspond au champ de recherches
								searchItsOk = true; // On change la valeur de la variable d'état
							}
						}
					}
					if (ingredientsSelect.length > 0 || appliancesSelect.length > 0 || ustensilsSelect.length > 0) {
						// Si un filtres est selectionné
						if (ingredientsSelect.length > 0) {
							// Si un filtre ingrédient est selectionné
							for (a = 0; a < ingredientsSelect.length; a++) {
								// On parcourt les filtres d'ingrédients selectionnés
								var filterIngredientsItsOk = false; // On initialise la variable d'état pour les filtres ingrédients
								for (j = 0; j < recipesDelete[i].ingredients.length; j++) {
									// On parcourt les ingredients de la recette en cours
									if (recipesDelete[i].ingredients[j].ingredient.toLowerCase() === ingredientsSelect[a].toLowerCase()) {
										// Si le filtre selectionné correspond à l'ingrédient en cours
										filterIngredientsItsOk = true; // On change la valeur de la varible d'état
										break;
									} else {
										// Sinon
										filterIngredientsItsOk = false; // On change la valeur de la varible d'état
									}
								}
							}
						}
						if (appliancesSelect.length > 0) {
							// Si un filtre appareils est selectionné
							for (a = 0; a < appliancesSelect.length; a++) {
								// On parcourt les filtes appareils selectionés
								var filterApplianceItsOk = false; // On initialise la variable d'état pour les filtres appareils
								if (recipesDelete[i].appliance.toLowerCase() === appliancesSelect[a].toLowerCase()) {
									// Si le filtre selectionné correspond à un appareil
									filterApplianceItsOk = true; // On change la valeur de la varible d'état
								} else {
									// Sinon
									filterApplianceItsOk = false; // On change la valeur de la varible d'état
								}
							}
						}
						if (ustensilsSelect.length > 0) {
							// Si un filtre ustensils est selectionné
							for (a = 0; a < ustensilsSelect.length; a++) {
								// On parcourt les filtres ustensils selectionnés
								var filterUstensilsItsOk = false; // On initialise la variable d'état pour les filtres ustensils
								for (j = 0; j < recipesDelete[i].ustensils.length; j++) {
									// On parcourt les ustensils de la recette en cours
									if (recipesDelete[i].ustensils[j].toLowerCase() === ustensilsSelect[a].toLowerCase()) {
										// Si le filtre selectionné correspond à un ustensils
										filterUstensilsItsOk = true; // On change la valeur de la varible d'état
										break;
									} else {
										// Sinon
										filterUstensilsItsOk = false; // On change la valeur de la varible d'état
									}
								}
							}
						}
						if (ingredientsSelect.length > 0 && ustensilsSelect.length === 0 && appliancesSelect.length === 0) {
							// Si un filtre ingrédient est selectionné
							if (filterIngredientsItsOk) {
								// On vérifie que le filtre soit ok
								filterItsOk = true; // Si c'est le cas, on passe la variable d'état sur true
							}
						} else if (ingredientsSelect.length > 0 && appliancesSelect.length > 0 && ustensilsSelect.length === 0) {
							// Si un filtre ingrédient et un filtre appareil est selectionné
							if (filterIngredientsItsOk && filterApplianceItsOk) {
								// On vérifie que les filtres soient ok
								filterItsOk = true; // Si c'est le cas, on passe la variable d'etat sur true
							}
						} else if (ingredientsSelect.length > 0 && ustensilsSelect.length > 0 && appliancesSelect.length === 0) {
							// Si un filtre ingredient et un filtre ustensils est selectionné
							if (filterIngredientsItsOk && filterUstensilsItsOk) {
								// On vérifie que les filtres soient ok
								filterItsOk = true; // Si c'est le cas, on passe la variable d'état sur true
							}
						} else if (ingredientsSelect.length > 0 && appliancesSelect.length > 0 && ustensilsSelect.length > 0) {
							// Si tous les filtres selectionnés contiennent au moins un élèment
							if (filterIngredientsItsOk && filterUstensilsItsOk && filterApplianceItsOk) {
								// On vérifie que les filtres soient ok
								filterItsOk = true; // Si c'est le cas, on passe la variable d'état sur true
							}
						} else if (appliancesSelect.length > 0 && ingredientsSelect.length === 0 && ustensilsSelect.length === 0) {
							// Si un filtre appareil est selectionné
							if (filterApplianceItsOk) {
								// On vérifie que les filtres soient ok
								filterItsOk = true; // Si c'est le cas, on passe la variable d'état sur true
							}
						} else if (ustensilsSelect.length > 0 && ingredientsSelect.length === 0 && appliancesSelect.length === 0) {
							// Si un filtre ustensil est selectionné
							if (filterUstensilsItsOk) {
								// On vérifie que les filtres soient ok
								filterItsOk = true; // Si c'est le cas, on passe la variable d'état sur true
							}
						}
					}
					if (
						value.length > 2 &&
						(ingredientsSelect.length > 0 || ustensilsSelect.length > 0 || appliancesSelect.length > 0)
					) {
						// Si le champ de recherches contient plus de 2 caractères et qu'au moins un filtre est selectionné
						if (searchItsOk && filterItsOk) {
							// On vérifie que la recherche et les filtres correspondent à la recette et si c'est le cas on les rajoute
							changeEl('adding', recipesDelete[i]); // On charge la fonction ajoutant ou supprimant la recette du DOM
							delete recipesDelete[i]; // On supprime la recette des recettes supprimées
						}
					} else if (
						value.length <= 2 &&
						(ingredientsSelect.length > 0 || ustensilsSelect.length > 0 || appliancesSelect.length > 0)
					) {
						// Si le champ de recherches contient moins de 2 caractère et qu'au moins un filtre est selectionné
						if (filterItsOk) {
							// On vérifie que les filtres correspondent à la recette et si c'est le cas on la rajoute
							changeEl('adding', recipesDelete[i]); // On charge la fonction ajoutant ou supprimant la recette du DOM
							delete recipesDelete[i]; // On supprime la recette des recettes supprimées
						}
					} else if (
						value.length > 2 &&
						ingredientsSelect.length === 0 &&
						ustensilsSelect.length === 0 &&
						appliancesSelect.length === 0
					) {
						// Si le champ de recherches contient plus de 2 caractère et qu'aucun filtre n'est selectionné
						if (searchItsOk) {
							// On vérifie que le champ de recherches correspondent à la recette et si c'est le cas on la rajoute
							changeEl('adding', recipesDelete[i]); // On charge la fonction ajoutant ou supprimant la recette du DOM
							delete recipesDelete[i]; // On supprime la recette des recettes supprimées
						}
					} else if (
						value.length <= 2 &&
						ingredientsSelect.length === 0 &&
						ustensilsSelect.length === 0 &&
						appliancesSelect.length === 0
					) {
						changeEl('adding', recipesDelete[i]); // On charge la fonction ajoutant ou supprimant la recette du DOM
						delete recipesDelete[i]; // On supprime la recette des recettes supprimées
					}
				}
			}
			reloadDOM(); // On recharge le DOM
		}
		// Sous fonction permettant d'ajouter ou supprimer une recette du DOM
		function changeEl(type, recipe) {
			if (type === 'delete') {
				const recipeEl = document.getElementById(`${recipe.id}`); // On récupère la recette concerné dans le DOM

				recipesDelete.push(recipe); // On ajoute la recette dans le tableau des recettes supprimées
				recipeEl.remove(); // On supprime la recette du DOM
			} else {
				const recipes = document.querySelector('.recettes'); // On récupère l'emplacement des recettes
				const recipesModel = recipesTemplate(recipe); // On ajoute dans le template les données de la recette à réaffiché
				const recipesDOM = recipesModel.recipesDOM(); // On l'affiche sur le DOM

				recipesDisplay.push(recipe); // On ajoute la recette au recettes affichées
				recipes.appendChild(recipesDOM); // On place la recette sur le DOM
			}
		}
	}

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
				getTypeFilter(input, e.target.value); // on affiche ou masque les élèments selon la recherche
			});
			erase.addEventListener('click', () => {
				// En cas de click sur erase
				eraseInput('filters', input);
			});
		});
	}

	// FONCTION commune
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
