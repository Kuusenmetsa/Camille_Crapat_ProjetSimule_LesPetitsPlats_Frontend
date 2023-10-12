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
			searchVerif(e);
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
	function searchVerif(e) {
		if (e.target.value.length <= 2) {
			if (recipesDelete.length > 0) {
				for (i = 0; i < recipesDelete.length; i++) {
					if (recipesDelete[i] !== undefined) {
						const recipes = document.querySelector('.recettes');
						const recipesModel = recipesTemplate(recipesDelete[i]);
						const recipesDOM = recipesModel.recipesDOM();

						recipesDisplay.push(recipesDelete[i]);
						recipes.appendChild(recipesDOM);
						delete recipesDelete[i];
					}
				}
			}
		} else {
			if (e.data === null) {
				for (i = 0; i < recipesDelete.length; i++) {
					var itsOk = false;
					if (recipesDelete[i] !== undefined) {
						for (j = 0; j < recipesDelete[i].ingredients.length; j++) {
							if (
								recipesDelete[i].ingredients[j].ingredient.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
							) {
								itsOk = true;
							}
						}
						for (k = 0; k < recipesDelete[i].ustensils.length; k++) {
							if (recipesDelete[i].ustensils[k].toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
								itsOk = true;
							}
						}
						if (
							recipesDelete[i].name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 ||
							recipesDelete[i].description.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 ||
							recipesDelete[i].appliance.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
						) {
							itsOk = true;
						}
						if (itsOk) {
							const recipes = document.querySelector('.recettes');
							const recipesModel = recipesTemplate(recipesDelete[i]);
							const recipesDOM = recipesModel.recipesDOM();

							recipesDisplay.push(recipesDelete[i]);
							recipes.appendChild(recipesDOM);
							delete recipesDelete[i];
						}
					}
				}
			} else {
				for (i = 0; i < recipesDisplay.length; i++) {
					var itsNotOk = true;
					if (recipesDisplay[i] !== undefined) {
						for (j = 0; j < recipesDisplay[i].ingredients.length; j++) {
							if (
								recipesDisplay[i].ingredients[j].ingredient.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
							) {
								itsNotOk = false;
								break;
							}
						}
						for (k = 0; k < recipesDisplay[i].ustensils.length; k++) {
							if (recipesDisplay[i].ustensils[k].toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
								itsNotOk = false;
								break;
							}
						}
						if (
							recipesDisplay[i] !== undefined &&
							(recipesDisplay[i].name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 ||
								recipesDisplay[i].description.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1 ||
								recipesDisplay[i].appliance.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1)
						) {
							itsNotOk = false;
						}
						if (itsNotOk) {
							const recipe = document.getElementById(`${recipesDisplay[i].id}`);

							recipesDelete.push(recipesDisplay[i]);
							recipe.remove();
							delete recipesDisplay[i];
						}
					}
				}
			}
		}
	}

	return { eraseInput };
}
