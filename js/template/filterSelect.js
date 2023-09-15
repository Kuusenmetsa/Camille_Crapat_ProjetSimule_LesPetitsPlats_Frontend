function filterSelectTemplate(data) {
	function filterSelectDOM() {
		const div = document.createElement('div');
		div.setAttribute('class', 'filterSelect');
		div.textContent = data;

		return div;
	}
	return { filterSelectDOM };
}
