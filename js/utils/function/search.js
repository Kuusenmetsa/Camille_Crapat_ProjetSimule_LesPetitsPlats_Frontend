function search() {
	// Variables

	// filter
	// DOM
	const searchInputFilter = document.querySelectorAll('.filter__options__search');

	// search
	// DOM
	const searchInput = document.querySelectorAll('.search');

	// Evènements

	// filter
	// Lorsque l'on tape dans un input
	searchInputFilter.forEach((search) => {
		const input = search.querySelector('.search-filter');
		input.addEventListener('input', (e) => {
			e.preventDefault();
			getTypeFilter(input, e.target.value);
		});
	});

	// Lorsqu'on clique sur erase dans recherche filter
	searchInputFilter.forEach((search) => {
		const erase = search.querySelector('.filter__options__search__erase');
		const input = search.querySelector('.search-filter');
		erase.addEventListener('click', () => {
			eraseInput(input);
		});
	});

	// search
	searchInput.forEach((search) => {
		const input = search.querySelector('input');
		input.addEventListener('input', (e) => {
			if (e.data !== null) {
				searchVerif('addingCharacter');
			} else {
				searchVerif('deleteCharacter');
			}
		});
	});

	// Fonctions

	// Filter
	// Suppression de la valeur de l'input
	function eraseInput(input) {
		input.value = '';
		getTypeFilter(input, '');
	}
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

	// search
	function searchVerif(type) {
		const value = document.querySelector('.search').querySelector('input').value; // On récupère la valeur de l'input
		if ((type === 'addingCharacter' && value.length > 2) || type === 'addingFilter') {
			// Si un caractère a été ajouté dans l'input et que sa valeur est supérieur à 2 ou si on ajoute un filtre
			for (i = 0; i < recipesDisplay.length; i++) {
				var searchItsNotOk = true; // On initialise la variable d'état
				var filterItsNotOk = true;

				if (recipesDisplay[i] !== undefined) {
					if (ingredientsSelect.length > 0 || appliancesSelect.length > 0 || ustensilsSelect.length > 0) {
						if (ingredientsSelect.length > 0) {
							for (a = 0; a < ingredientsSelect.length; a++) {
								var filterIngredientsItsOk = false;
								for (j = 0; j < recipesDisplay[i].ingredients.length; j++) {
									if (
										recipesDisplay[i].ingredients[j].ingredient.toLowerCase() === ingredientsSelect[a].toLowerCase()
									) {
										filterIngredientsItsOk = true;
										break;
									} else {
										filterIngredientsItsOk = false;
									}
								}
							}
						}
						if (appliancesSelect.length > 0) {
							for (a = 0; a < appliancesSelect.length; a++) {
								var filterApplianceItsOk = false;
								if (recipesDisplay[i].appliance.toLowerCase() === appliancesSelect[a].toLowerCase()) {
									filterApplianceItsOk = true;
									break;
								} else {
									filterApplianceItsOk = false;
								}
							}
						}
						if (ustensilsSelect.length > 0) {
							for (a = 0; a < ustensilsSelect.length; a++) {
								var filterUstensilsItsOk = false;
								for (j = 0; j < recipesDisplay[i].ustensils.lengt; j++) {
									if (recipesDisplay[i].ustensils[j].toLowerCase() === ustensilsSelect[a].toLowerCase()) {
										filterUstensilsItsOk = true;
										break;
									} else {
										filterUstensilsItsOk = false;
									}
								}
							}
						}
						if (ingredientsSelect.length > 0) {
							if (filterIngredientsItsOk) {
								filterItsNotOk = false;
							}
						} else if (ingredientsSelect.length > 0 && appliancesSelect.length > 0) {
							if (filterIngredientsItsOk && filterApplianceItsOk) {
								filterItsNotOk = false;
							}
						} else if (ingredientsSelect.length > 0 && ustensilsSelect.length > 0) {
							if (filterIngredientsItsOk && filterUstensilsItsOk) {
								filterItsNotOk = false;
							}
						} else if (ingredientsSelect.length > 0 && appliancesSelect.length > 0 && ustensilsSelect.length > 0) {
							if (filterIngredientsItsOk && filterUstensilsItsOk && filterApplianceItsOk) {
								filterItsNotOk = false;
							}
						} else if (appliancesSelect.length > 0) {
							if (filterApplianceItsOk) {
								filterItsNotOk = false;
							}
						} else if (ustensilsSelect.length > 0) {
							if (filterUstensilsItsOk) {
								filterItsNotOk = false;
							}
						}
					}
					if (value.length > 2) {
						if (
							recipesDisplay[i].name.toLowerCase().indexOf(value.toLowerCase()) !== -1 ||
							recipesDisplay[i].description.toLowerCase().indexOf(value.toLowerCase()) !== -1
						) {
							searchItsNotOk = false;
						}
						for (j = 0; j < recipesDisplay[i].ingredients.length; j++) {
							if (recipesDisplay[i].ingredients[j].ingredient.toLowerCase().indexOf(value.toLowerCase()) !== -1) {
								searchItsNotOk = false;
							}
						}
					}
					if (
						value.length > 2 &&
						(ingredientsSelect.length > 0 || appliancesSelect.length > 0 || ustensilsSelect.length > 0)
					) {
						if (searchItsNotOk && filterItsNotOk) {
							const recipe = document.getElementById(`${recipesDisplay[i].id}`);

							recipesDelete.push(recipesDisplay[i]);
							recipe.remove();
							delete recipesDisplay[i];
							numberOfRecipes();
						}
					} else if (value.length > 2) {
						if (searchItsNotOk) {
							const recipe = document.getElementById(`${recipesDisplay[i].id}`);

							recipesDelete.push(recipesDisplay[i]);
							recipe.remove();
							delete recipesDisplay[i];
							numberOfRecipes();
						}
					} else if (ingredientsSelect.length > 0 || appliancesSelect.length > 0 || ustensilsSelect.length > 0) {
						if (filterItsNotOk) {
							const recipe = document.getElementById(`${recipesDisplay[i].id}`);

							recipesDelete.push(recipesDisplay[i]);
							recipe.remove();
							delete recipesDisplay[i];
							numberOfRecipes();
						}
					}
				}
			}
		} /*else {
			for (i = 0; i < recipesDelete.length; i++) {
				var searchItsOk = true; // On initialise la variable d'état

				if (recipesDelete[i] !== undefined) {
					console.log('ok');
				}
			}
		}*/
	}

	function numberOfRecipes() {
		const count = document.querySelectorAll('.recettes > article').length;
		const el = document.querySelector('.numberOfRecipes');
		el.textContent = `${count} recette${count > 1 ? 's' : ''}`;
	}

	return { eraseInput, searchVerif };
}
