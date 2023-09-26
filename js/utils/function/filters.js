function filters() {
	// Variables

	// filter
	// DOM
	const numberOfRecipes = document.querySelector('div.numberOfRecipes');
	const filter = document.querySelectorAll('div.filter');

	// filterSelected
	// DOM
	const filtersSelect = document.querySelector('.filtersSelect');
	const li = document.querySelectorAll('li.option');

	// Evènements

	// filter
	// Click sur un filtre
	filter.forEach((fil) => {
		const filterName = fil.querySelector('div.filter__name');
		const option = fil.querySelector('div.filter__options');
		filterName.addEventListener('click', () => {
			toogleFilter(fil, option);
		});
	});

	// filterSelect
	// Clique sur un li
	li.forEach((li) => {
		li.addEventListener('click', (e) => {
			e.stopImmediatePropagation();
			addFilterSelected(li);
		});
	});

	// Fonctions

	// filter
	// Initialisation des filters avant affichage
	function initFilters() {
		recipesCurrent.forEach((recipe) => {
			recipe.ingredients.forEach((ingredient) => {
				if (ingredientsFilter.length === 0) {
					ingredientsFilter.push(ingredient.ingredient.toLowerCase());
				} else if (ingredientsFilter.indexOf(ingredient.ingredient.toLowerCase()) === -1) {
					ingredientsFilter.push(ingredient.ingredient.toLowerCase());
				}
			});
			recipe.ustensils.forEach((ustensil) => {
				if (ustensilsFilter.length === 0) {
					ustensilsFilter.push(ustensil.toLowerCase());
				} else if (ustensilsFilter.indexOf(ustensil.toLowerCase()) === -1) {
					ustensilsFilter.push(ustensil.toLowerCase());
				}
			});

			if (appliancesFilter.length === 0) {
				appliancesFilter.push(recipe.appliance.toLowerCase());
			} else if (appliancesFilter.indexOf(recipe.appliance.toLowerCase()) === -1) {
				appliancesFilter.push(recipe.appliance.toLowerCase());
			}
		});
	}

	function sortFilters() {
		ingredientsFilter.sort();
		ustensilsFilter.sort();
		appliancesFilter.sort();
	}

	// Chargement de l'affichage des filters
	function displayFilters() {
		const typeRecipes = [
			{ type: 'Ingrédients', css: 'ingredients', data: ingredientsFilter },
			{ type: 'Appareils', css: 'appareils', data: appliancesFilter },
			{ type: 'Ustensiles', css: 'ustensiles', data: ustensilsFilter },
		];
		typeRecipes.forEach((typeRecipe) => {
			const filterModel = filterTemplate(typeRecipe.type, typeRecipe.css, typeRecipe.data);
			const filterDOM = filterModel.filterDOM();
			numberOfRecipes.before(filterDOM);
		});
	}

	// Ouverture et fermeture de filter
	function toogleFilter(fil, option) {
		if (option.classList.contains('open') && fil.classList.contains('open')) {
			closeFilter(fil, option);
		} else {
			openFilter(fil, option);
		}
		function openFilter(fil, options) {
			options.classList.add('open');
			fil.classList.add('open');
		}

		function closeFilter(fil, options) {
			options.classList.remove('open');
			fil.classList.remove('open');
		}
	}

	// filterSelect
	// Ajout d'un filter select
	function addFilterSelected(el) {
		switch (el.classList[1]) {
			case 'ingredients':
				ingredientsFilter.splice(ingredientsFilter.indexOf(el.textContent), 1);
				ingredientsSelect.push(el.textContent);
				break;
			case 'appareils':
				appliancesFilter.splice(appliancesFilter.indexOf(el.textContent), 1);
				appliancesSelect.push(el.textContent);
				break;
			case 'ustensiles':
				ustensilsFilter.splice(ustensilsFilter.indexOf(el.textContent), 1);
				ustensilsSelect.push(el.textContent);
				break;
		}
		el.remove();
		const fitlerSelectModel = filterSelectedTemplate(el.textContent, el.classList[1]);
		const filterSelectDOM = fitlerSelectModel.filterSelectedDOM();
		filtersSelect.appendChild(filterSelectDOM);
		closeAllFilters();
		reloadEvent();
	}

	// Fermeture de tous les filters
	function closeAllFilters() {
		const isOpen = document.querySelectorAll('.open');
		const inputs = document.querySelectorAll('.search-filter');
		inputs.forEach((input) => {
			search().eraseInput(input);
		});
		if (isOpen.length > 0) {
			isOpen.forEach((isOpen) => {
				isOpen.classList.remove('open');
			});
		}
	}

	// Rechargement des évènements après changement dans le DOM
	function reloadEvent() {
		const filterSelect = document.querySelectorAll('.filterSelect');
		// Click sur un filtre selctionné
		filterSelect.forEach((el) => {
			el.addEventListener('click', (e) => {
				e.stopImmediatePropagation();
				delteFilterSelected(el);
			});
		});

		const li = document.querySelectorAll('li');
		li.forEach((el) => {
			el.addEventListener('click', (e) => {
				e.stopImmediatePropagation();
				addFilterSelected(el);
			});
		});
	}

	// Suppression d'un filter qui est selectionné
	function delteFilterSelected(el) {
		switch (el.classList[1]) {
			case 'ingredients':
				const filterLiDOMIngredients = filterTemplate().filterLiDOM(el.textContent, 'ingredients');
				document.querySelector('.filter.ingredients').querySelector('ul').appendChild(filterLiDOMIngredients);
				ingredientsSelect.splice(ingredientsSelect.indexOf(el.textContent), 1);
				ingredientsFilter.push(el.textContent);
				break;
			case 'appareils':
				const filterLiDOMAppliance = filterTemplate().filterLiDOM(el.textContent, 'appareils');
				document.querySelector('.filter.appareils').querySelector('ul').appendChild(filterLiDOMAppliance);
				appliancesSelect.splice(appliancesSelect.indexOf(el.textContent), 1);
				appliancesFilter.push(el.textContent);
				break;
			case 'ustensiles':
				const filterLiDOMUstensils = filterTemplate().filterLiDOM(el.textContent, 'ustensiles');
				document.querySelector('.filter.ustensiles').querySelector('ul').appendChild(filterLiDOMUstensils);
				ustensilsSelect.splice(ustensilsSelect.indexOf(el.textContent), 1);
				ustensilsFilter.push(el.textContent);
				break;
		}
		el.remove();
		reloadEvent();
	}
	return { initFilters, sortFilters, displayFilters };
}
