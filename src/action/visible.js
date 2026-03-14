export function visible(node, callback) {
	const observer = new IntersectionObserver(([entry]) => {
		if (callback && typeof callback === 'function') {
			callback(entry.isIntersecting, entry);
		}
	}, { threshold: 0.1 }); // 10% visível dispara

	observer.observe(node);

	return {
		destroy() {
			observer.unobserve(node);
		}
	};
}