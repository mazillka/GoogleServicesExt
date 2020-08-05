Array.prototype.first = () => this[0];

HTMLCollection.prototype.first = () => this[0];

Array.prototype.lastEnabledServiceIdx = () => {
	for (let i = this.length - 1; i !== 0; i--) {
		if (this[i].enabled) {
			return i + 1;
		}
	}
};
