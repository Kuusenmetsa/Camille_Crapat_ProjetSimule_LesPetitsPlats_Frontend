function filter() {
	// Variables
	// DOM
	const numberOfRecipes = document.querySelector('div.numberOfRecipes');
	const filter = document.querySelectorAll('div.filter');

	// Evénements
	// Click sur un filtre
	filter.forEach((fil) => {
		const filterName = fil.querySelector('div.filter__name');
		const option = fil.querySelector('div.filter__options');
		filterName.addEventListener('click', () => {
			toogleFilter(fil, option);
		});
	});

	// Click sur une selection

	function displayFilter() {
		const typeRecipes = [
			{ type: 'Ingrédients', css: 'ingredients' },
			{ type: 'Appareils', css: 'appareils' },
			{ type: 'Ustensiles', css: 'ustensiles' },
		];
		typeRecipes.forEach((typeRecipe) => {
			const sortModel = sortTemplate(typeRecipe.type, typeRecipe.css, recipesData);
			const sortDOM = sortModel.sortDOM();
			numberOfRecipes.before(sortDOM);
		});
		numberOfRecipes.textContent = `${recipesData.length} ${recipesData.length > 1 ? `Recettes` : `Recette`}`;
	}

	function toogleFilter(fil, option) {
		if (option.classList.contains('open') && fil.classList.contains('open')) {
			closeFilter(fil, option);
		} else {
			openFilter(fil, option);
		}
	}

	function openFilter(fil, options) {
		options.classList.add('open');
		fil.classList.add('open');
	}

	function closeFilter(fil, options) {
		options.classList.remove('open');
		fil.classList.remove('open');
	}

	return { openFilter, closeFilter, displayFilter };
}
