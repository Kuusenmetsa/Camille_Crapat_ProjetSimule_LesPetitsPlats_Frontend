function sortTemplate(type, css, datas) {
	if (datas && datas.length > 0) {
		var ingredientsCurrent = [];
		var ustensilsCurrent = [];
		var appliancesCurrent = [];

		datas.forEach((data) => {
			data.ingredients.forEach((ingredient) => {
				if (ingredientsCurrent.length === 0) {
					ingredientsCurrent.push(ingredient.ingredient.toLowerCase());
				} else if (ingredientsCurrent.indexOf(ingredient.ingredient.toLowerCase()) === -1) {
					ingredientsCurrent.push(ingredient.ingredient.toLowerCase());
				}
			});
			data.ustensils.forEach((ustensil) => {
				if (ustensilsCurrent.length === 0) {
					ustensilsCurrent.push(ustensil.toLowerCase());
				} else if (ustensilsCurrent.indexOf(ustensil.toLowerCase()) === -1) {
					ustensilsCurrent.push(ustensil.toLowerCase());
				}
			});
			if (appliancesCurrent.length === 0) {
				appliancesCurrent.push(data.appliance.toLowerCase());
			} else if (appliancesCurrent.indexOf(data.appliance.toLowerCase()) === -1) {
				appliancesCurrent.push(data.appliance.toLowerCase());
			}
		});
		ingredientsCurrent.sort();
		ustensilsCurrent.sort();
		appliancesCurrent.sort();
	}

	function sortDOM() {
		const eraseImg = `assets/icones/erase--grey.svg`;
		const searchBtnImg = `assets/icones/search--grey.svg`;

		const filter = document.createElement('div');
		filter.setAttribute('class', `filter ${css}`);

		const filterName = document.createElement('div');
		filterName.setAttribute('class', `filter__name`);
		filterName.textContent = type;

		const filterOptions = document.createElement('div');
		filterOptions.setAttribute('class', 'filter__options');

		const filterOptionsSearch = document.createElement('div');
		filterOptionsSearch.setAttribute('class', 'filter__options__search');

		const input = document.createElement('input');
		input.setAttribute('type', 'text');
		input.setAttribute('name', 'search');

		const erase = document.createElement('img');
		erase.setAttribute('src', eraseImg);
		erase.setAttribute('alt', 'erase');
		erase.setAttribute('class', 'filter__options__search__erase');

		const search = document.createElement('img');
		search.setAttribute('src', searchBtnImg);
		search.setAttribute('alt', 'search');
		search.setAttribute('class', 'filter__options__search__searchBtn');

		filterOptionsSearch.appendChild(input);
		filterOptionsSearch.appendChild(erase);
		filterOptionsSearch.appendChild(search);

		const ul = document.createElement('ul');

		switch (type) {
			case 'Ingrédients':
				ingredientsCurrent.forEach((ingredient) => {
					ul.appendChild(liDOM(ingredient, css));
				});
				break;
			case 'Appareils':
				appliancesCurrent.forEach((appliance) => {
					ul.appendChild(liDOM(appliance, css));
				});
				break;
			case 'Ustensiles':
				ustensilsCurrent.forEach((ustensil) => {
					ul.appendChild(liDOM(ustensil, css));
				});
				break;
		}

		filterOptions.appendChild(filterOptionsSearch);
		filterOptions.appendChild(ul);

		filter.appendChild(filterName);
		filter.appendChild(filterOptions);
		return filter;
	}

	function liDOM(valeur, css) {
		const li = document.createElement('li');
		li.setAttribute('class', `option ${css}`);
		li.textContent = valeur;

		return li;
	}
	return { sortDOM, liDOM };
}
