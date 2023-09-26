function filterTemplate(type, css, data) {
	function filterDOM() {
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
		input.setAttribute('name', `search-${css}`);
		input.setAttribute('id', css);
		input.setAttribute('class', 'search-filter');

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
		ul.setAttribute('class', css);

		data.forEach((data) => {
			ul.appendChild(filterLiDOM(data, css));
		});

		filterOptions.appendChild(filterOptionsSearch);
		filterOptions.appendChild(ul);

		filter.appendChild(filterName);
		filter.appendChild(filterOptions);
		return filter;
	}

	function filterLiDOM(valeur, css) {
		const li = document.createElement('li');
		li.setAttribute('class', `option ${css}`);
		li.textContent = valeur;

		return li;
	}

	return { filterDOM, filterLiDOM };
}
