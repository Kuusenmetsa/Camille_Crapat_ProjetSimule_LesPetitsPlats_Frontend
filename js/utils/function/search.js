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
				var filterItsOk = false;
				var searchItsNotOk = true; // On initialise la variable d'état

				if (recipesDisplay[i] !== undefined) {
					if (ingredientsSelect.length > 0 || appliancesSelect.length > 0 || ustensilsSelect.length > 0) {
						if (ingredientsSelect.length > 0) {
							for (a = 0; a < ingredientsSelect.length; a++) {
								if (recipesDisplay[i].ingredients.indexOf(ingredientsSelect[a]) === -1) {
									// VOIR AVEC AURELIE NE PEUT PAS FONCTIONNER PUISQUE INGREDIENT CONTIENT UN OBJ
									filterItsOk = true;
									break;
								}
							}
						}
						if (appliancesSelect.length > 0) {
							for (a = 0; a < appliancesSelect.length; a++) {
								if (recipesDisplay[i].appliance.toLowerCase() !== appliancesSelect[a]) {
									filterItsOk = true;
									break;
								}
							}
						}
						if (ustensilsSelect.length > 0) {
							for (a = 0; a < ustensilsSelect.length; a++) {
								if (recipesDisplay[i].ustensils.indexOf(ustensilsSelect[a]) === -1) {
									// VOIR AVEC AURELIE (TOLOWERCASE)
									filterItsOk = true;
									break;
								}
							}
						}
						if (filterItsOk) {
							const recipe = document.getElementById(`${recipesDisplay[i].id}`);

							recipesDelete.push(recipesDisplay[i]);
							recipe.remove();
							delete recipesDisplay[i];
							numberOfRecipes();
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
						if (searchItsNotOk) {
							const recipe = document.getElementById(`${recipesDisplay[i].id}`);

							recipesDelete.push(recipesDisplay[i]);
							recipe.remove();
							delete recipesDisplay[i];
							numberOfRecipes();
						}
					}
				}
			}
		} else {
			for (i = 0; i < recipesDelete.length; i++) {
				var filterItsOk = false;
				var searchItsNotOk = true; // On initialise la variable d'état

				if (recipesDelete[i] !== undefined) {
				}
			}
		}
	}

	function numberOfRecipes() {
		const count = document.querySelectorAll('.recettes > article').length;
		const el = document.querySelector('.numberOfRecipes');
		el.textContent = `${count} recette${count > 1 ? 's' : ''}`;
	}

	return { eraseInput, searchVerif };
}
