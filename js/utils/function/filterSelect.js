function filterSelect() {
	// Variables
	// DOM
	const filtersSelect = document.querySelector('.filtersSelect');
	const li = document.querySelectorAll('li.option');

	// Evenements
	// CLick sur un li
	li.forEach((li) => {
		li.addEventListener('click', (e) => {
			e.stopImmediatePropagation();
			addFilterSelected(li);
		});
	});

	// Function
	// Ajout d'un filtre selectionné
	function addFilterSelected(li) {
		li.remove();
		allCloseFilter();

		const filterSelectModel = filterSelectTemplate(li.textContent, li.classList[1]);
		const filterSelectDOM = filterSelectModel.filterSelectDOM();
		filtersSelect.appendChild(filterSelectDOM);
		reloadEvents();
	}

	function allCloseFilter() {
		const isOpen = document.querySelectorAll('.open');
		if (isOpen.length > 0) {
			isOpen.forEach((isOpen) => {
				isOpen.classList.remove('open');
			});
		}
	}

	function reloadEvents() {
		const filterSelect = document.querySelectorAll('.filterSelect');
		// Click sur un filtre selctionné
		filterSelect.forEach((sel) => {
			sel.addEventListener('click', (e) => {
				e.stopImmediatePropagation();
				console.log(sel);
				deleteFilterSlected(sel);
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

	function deleteFilterSlected(filterSelect) {
		filterSelect.classList.forEach((classList) => {
			switch (classList) {
				case 'ingredients':
					const liDOMIngredient = sortTemplate().liDOM(filterSelect.textContent, 'ingredients');
					document.querySelector('.filter.ingredients').querySelector('ul').appendChild(liDOMIngredient);
					console.log(classList);
					break;
				case 'appareils':
					const liDOMAppareils = sortTemplate().liDOM(filterSelect.textContent, 'appareils');
					document.querySelector('.filter.appareils').querySelector('ul').appendChild(liDOMAppareils);
					break;
				case 'ustensiles':
					const liDOMUstensils = sortTemplate().liDOM(filterSelect.textContent, 'ustensiles');
					document.querySelector('.filter.ustensiles').querySelector('ul').appendChild(liDOMUstensils);
					break;
			}
		});
		reloadEvents();
		filterSelect.remove();
	}

	return {};
}
