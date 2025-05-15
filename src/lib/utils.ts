/** Dispatch event on click outside of node */
export const clickOutside = (node: HTMLElement, click: () => void) => {
	const handleClick = (event: Event) => {
		if (
			node &&
			!node.contains(event.target as Node) &&
			!event.defaultPrevented &&
			node.classList.contains('open')
		) {
			click();
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};
