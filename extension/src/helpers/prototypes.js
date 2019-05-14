Array.prototype.first = function () {
    return this[0];
};

HTMLCollection.prototype.first = function () {
    return this[0];
};

Array.prototype.lastActiveServiceIdx = function () {
    for (let i = this.length - 1; i !== 0; i--) {
        if (this[i].status) {
            return i + 1;
        }
    }
};
