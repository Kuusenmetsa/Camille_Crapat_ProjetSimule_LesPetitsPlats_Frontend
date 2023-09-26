function search() {
	// Variables

	// filter
	// DOM
	const searchInputFilter = document.querySelectorAll('.filter__options__search');
	const searchEraseFilter = document.querySelectorAll('.filter__options__search__erase');

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

	return { eraseInput };
}
