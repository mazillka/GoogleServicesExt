Array.prototype.first = () => {
	return this[0];
};

HTMLCollection.prototype.first = () => {
	return this[0];
};

Array.prototype.lastActiveServiceIdx = () => {
	for (let i = this.length - 1; i !== 0; i--) {
		if (this[i].status) {
			return i + 1;
		}
	}
};
