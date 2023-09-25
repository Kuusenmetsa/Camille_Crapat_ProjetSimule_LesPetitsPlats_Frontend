function filters() {
	// Variables
	// DOM

	// filter
	const numberOfRecipes = document.querySelector('div.numberOfRecipes');
	const filter = document.querySelectorAll('div.filter');

	// filterSelected
	const filtersSelect = document.querySelector('.filtersSelect');
	const li = document.querySelectorAll('li.option');

	//

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
}
