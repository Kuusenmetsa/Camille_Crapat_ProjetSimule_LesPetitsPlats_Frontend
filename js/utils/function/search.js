/*--------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------function search-------------------------------------------------*/
/*-------------------fonction gérant la recherche dans le champs recherche et dans les filtres------------------*/
/*---------------------------------------------par Camille CRAPAT-----------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------*/

function search() {
	// VARIABLES

	// VARIABLES concernant filter
	// DOM
	const searchInputFilter = document.querySelectorAll('.filter__options__search');

	// VARIABLES concernant search
	// DOM
	const searchInput = document.querySelectorAll('.search');

	// EVENEMENTS

	// EVENEMENTS concernant filter
	// Lorsque l'on tape dans un input // Lorsque on click sur la croix
	searchInputFilter.forEach((search) => {
		const erase = search.querySelector('.filter__options__search__erase');
		const input = search.querySelector('.search-filter');
		input.addEventListener('input', (e) => {
			e.preventDefault();
			getTypeFilter(input, e.target.value); // On applique la recherche dans le filtre
		});
		erase.addEventListener('click', () => {
			eraseInput('filters', input);
		});
	});

	// EVENEMENTS concernant search
	// Lorsque l'on tape quelque chose dans le champs de recherche // Lorsque l'on click sur la croix
	searchInput.forEach((search) => {
		const erase = search.querySelector('.search__erase');
		const input = search.querySelector('input');
		input.addEventListener('input', (e) => {
			if (e.data !== null) {
				// Si on ajoute un caractère
				//searchVerif('addingCharacter');
			} else {
				// Si on eface un caractère
				//searchVerif('deleteCharacter');
			}
		});
		erase.addEventListener('click', () => {
			eraseInput('search', input);
		});
	});

	// FONCTIONS

	// FONCTION concernant filter

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
		// Sous fonction permettant d'afficher ou non l'élèment de liste
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

	// FONCTION commune
	// Suppression de la valeur du champs recherche dans filtre
	function eraseInput(type, input) {
		input.value = ''; // On passe la valeur de l'input à vide
		if (type === 'filters') {
			// si ça concerne un filtre
			getTypeFilter(input, ''); // On reinitialise la recherche des filtres
		} else {
			// Sinon
			//searchVerif('deleteCharacter'); // On réinitialise la recherche
		}
	}

	return { searchVerif, eraseInput }; // On retourne la fonction searchVerif pour la selection des filtres
}
