function filterSelectTemplate(data, css) {
	function filterSelectDOM() {
		const div = document.createElement('div');
		div.setAttribute('class', `filterSelect ${css}`);
		div.textContent = data;

		return div;
	}
	return { filterSelectDOM };
}
