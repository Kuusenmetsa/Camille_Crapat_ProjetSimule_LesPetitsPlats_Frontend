function recipesTemplate(data) {
	const { image, name, ingredients, time, description } = data;

	const picture = `assets/imgs/recettes/${image}`;

	function recipesDOM() {
		const article = document.createElement('article');
		const figure = document.createElement('figure');
		const img = document.createElement('img');
		img.setAttribute('src', picture);
		img.setAttribute('alt', name);
		const duration = document.createElement('div');
		duration.setAttribute('class', 'duration');
		duration.textContent = `${time} min`;
		const figcaption = document.createElement('figcaption');
		const h3 = document.createElement('h3');
		h3.textContent = name;
		const recettes = document.createElement('h4');
		recettes.textContent = 'RECETTE';
		const p = document.createElement('p');
		p.setAttribute('class', 'recipes');
		p.textContent = description.substring(0, 100) + '...';
		const ingredientsTitle = document.createElement('h4');
		ingredientsTitle.textContent = 'INGREDIENTS';
		const ingredientsContainer = document.createElement('div');
		ingredientsContainer.setAttribute('class', 'ingredients');
		ingredients.forEach((ingredient) => {
			ingredientsContainer.appendChild(ingredientsRecipes(ingredient.ingredient, ingredient.quantity, ingredient.unit));
		});

		figcaption.appendChild(h3);
		figcaption.appendChild(recettes);
		figcaption.appendChild(p);
		figcaption.appendChild(ingredientsTitle);
		figcaption.appendChild(ingredientsContainer);

		figure.appendChild(img);
		figure.appendChild(duration);
		figure.appendChild(figcaption);

		article.appendChild(figure);

		return article;
	}
	function ingredientsRecipes(ingredient, quantity, unit) {
		const div = document.createElement('div');
		div.setAttribute('class', 'ingredient');
		const h5 = document.createElement('h5');
		h5.textContent = ingredient;
		const p = document.createElement('p');
		if (unit && unit.length > 2) {
			p.textContent = `${quantity} ${unit}`;
		} else if (unit && unit.length <= 2) {
			p.textContent = `${quantity}${unit}`;
		} else {
			p.textContent = quantity;
		}

		div.appendChild(h5);
		div.appendChild(p);

		return div;
	}

	return { recipesDOM, ingredientsRecipes };
}
