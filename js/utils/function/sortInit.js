function sortInit(datas) {
	var currentEl = [];

	datas.forEach((data) => {
		data.ingredients.forEach((ingredient) => {
			if (currentEl.length === 0) {
				currentEl.push({ type: 'Ingrédients', text: ingredient.ingredient.toLowerCase() });
			}
			currentEl.forEach((el) => {
				if (el.text !== ingredient.ingredient.toLowerCase()) {
					currentEl.push({ type: 'Ingrédients', text: ingredient.ingredient.toLowerCase() });
				}
			});
		});
		data.ustensils.forEach((ustensil) => {
			if (currentEl.length === 0) {
				currentEl.push({ type: 'Appareils', text: ustensil.toLowerCase() });
			} else if (currentEl.indexOf(ustensil.toLowerCase()) === -1) {
				currentEl.push({ type: 'Appareils', text: ustensil.toLowerCase() });
			}
		});
		if (currentEl.length === 0) {
			currentEl.push({ type: 'Ustensiles', text: data.appliance.toLowerCase() });
		} else if (currentEl.indexOf(data.appliance.toLowerCase()) === -1) {
			currentEl.push({ type: 'Ustensiles', text: data.appliance.toLowerCase() });
		}
	});
	console.log(currentEl);
}
