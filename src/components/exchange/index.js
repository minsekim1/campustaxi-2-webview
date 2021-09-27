export const DateToStr = () => {
	let date = new Date()
	let year = date.getFullYear()
	let month = String(date.getMonth() + 1).padStart(2, '0');
	let day = String(date.getDate()).padStart(2, '0');
	let hour = String(date.getHours()).padStart(2, '0');
	let min = String(date.getMinutes()).padStart(2, '0');
	let sec = String(date.getSeconds()).padStart(2, '0');

	// return "2018-06-12T19:30"
	return `${year}-${month}-${day}T${hour}:${min}:${sec}`;
}
