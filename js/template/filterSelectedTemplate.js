function filterSelectedTemplate(datas, css) {
	function filterSelectedDOM() {
		const div = document.createElement('div');
		div.setAttribute('class', `filterSelect ${css}`);
		div.textContent = datas;

		return div;
	}
	return filterSelectedDOM;
}
