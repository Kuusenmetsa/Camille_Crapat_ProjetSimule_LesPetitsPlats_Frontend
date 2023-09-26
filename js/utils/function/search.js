function search() {
	// Variables

	// filter
	// DOM
	const searchInputFilter = document.querySelectorAll('input.search');

	// Evènements

	// filter
	// Lorsque l'on tape dans un input
	searchInputFilter.forEach((search) => {
		search.addEventListener('input', (e) => {
			e.preventDefault();
			getTypeFilter(search, e);
		});
	});

	// Fonctions

	// Filter
	// Récupération du type de filter
	function getTypeFilter(search, event) {
		switch (search.getAttribute('id')) {
			case 'ingredients':
				searchFilter('ingredients', event.target.value);
				break;
			case 'appareils':
				searchFilter('appareils', event.target.value);
				break;
			case 'ustensiles':
				searchFilter('ustensiles', event.target.value);
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

	return {};
}
