export const removeFromArray = (mass, value, change = false) => {
	const index = mass.indexOf(value);
	let newArr = [];
	if (index === -1) {
		if (change) {
			newArr = newArr.concat(mass, value);
		} else {
			newArr = mass;
		}
	} else if (index === 0) {
		newArr = newArr.concat(mass.slice(1));
	} else if (index === mass.length - 1) {
		newArr = newArr.concat(mass.slice(0, -1));
	} else if (index > 0) {
		newArr = newArr.concat(mass.slice(0, index), mass.slice(index + 1));
	}
	return newArr;
};