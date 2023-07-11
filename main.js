// Dragable file
const container = document.querySelector('.container');
const headFile = document.querySelector('.head-file');
// test
// const headh1 = document.querySelector('.head-title h1');

// ***** tambahan
var styles = window.getComputedStyle(container);
// var topStyles = parseInt(styles.top);
var topStyles = styles.top;
// var leftStyles = parseInt(styles.left);
var leftStyles = styles.left;
// var topStyles = container.style.top;
console.log('topStyles = ', topStyles);
// var leftStyles = container.style.left;
console.log('leftStyles =', leftStyles);

let isResizing = false;

headFile.addEventListener('mousedown', mousedown);

function mousedown(e) {
	window.addEventListener('mousemove', mousemove);
	window.addEventListener('mouseup', mouseup);

	let posX = e.clientX;
	let posY = e.clientY;

	function mousemove(e) {
		if (!isResizing) {
			let nextX = posX - e.clientX;
			let nextY = posY - e.clientY;

			const rect = container.getBoundingClientRect();

			container.style.left = rect.left - nextX + 'px';
			container.style.top = rect.top - nextY + 'px';
			leftStyles = container.style.left;
			topStyles = container.style.top;

			posX = e.clientX;
			console.log('posX = ', posX);
			console.log('leftStyles =', leftStyles);
			posY = e.clientY;
			console.log('posY = ', posY);
			console.log('topStyles = ', topStyles);

		}
	}

	function mouseup() {
		window.removeEventListener('mousemove', mousemove);
		window.removeEventListener('mouseup', mouseup);
	}
}

// Resizeble File
const handlers = document.querySelectorAll('.handler');
let currentHandle;

// *** tambahan
// var widthStyles = parseInt(styles.width);
var widthStyles = styles.width;
// var heightStyles = parseInt(styles.height);
var heightStyles = styles.height;
console.log('widthStyles = ', widthStyles);
console.log('heightStyles = ', heightStyles);

for (let handler of handlers) {
	handler.addEventListener('mousedown', mousedown);

	function mousedown(e) {
		currentHandle = e.target;
		isResizing = true;

		let posX = e.clientX;
		let posY = e.clientY;

		window.addEventListener('mousemove', mousemove);
		window.addEventListener('mouseup', mouseup);

		function mousemove(e) {
			const rect = container.getBoundingClientRect();
			// test
			// const hh1 = headh1.getBoundingClientRect();

			if (currentHandle.classList.contains('nw')) {
				container.style.width = rect.width + (posX - e.clientX) + 'px';
				container.style.height =
					rect.height + (posY - e.clientY) + 'px';
				container.style.left = rect.left - (posX - e.clientX) + 'px';
				container.style.top = rect.top - (posY - e.clientY) + 'px';
				// if (rect.width < 245) {
				//     mouseup();
				// }
				// *tambahan*
				widthStyles = container.style.width;
				heightStyles = container.style.height;

			} else if (currentHandle.classList.contains('n')) {
				container.style.height =
					rect.height + (posY - e.clientY) + 'px';

				//tambahan
				let height = parseFloat(container.style.height.replace('px', ''));

				container.style.top = height > 50 ? rect.top - (posY - e.clientY) + 'px' : rect.top;
				// *tambahan*
				widthStyles = container.style.width;
				heightStyles = container.style.height;

			} else if (currentHandle.classList.contains('ne')) {
				container.style.width = rect.width - (posX - e.clientX) + 'px';
				container.style.height =
					rect.height + (posY - e.clientY) + 'px';
				container.style.top = rect.top - (posY - e.clientY) + 'px';
				// *tambahan*
				widthStyles = container.style.width;
				heightStyles = container.style.height;

			} else if (currentHandle.classList.contains('w')) {
				let width = parseFloat(container.style.width.replace('px', ''));

				container.style.left =
					width > 270
						? rect.left - (posX - e.clientX) + 'px'
						: rect.left;
				container.style.width = rect.width + (posX - e.clientX) + 'px';
				// *tambahan*
				widthStyles = container.style.width;
				heightStyles = container.style.height;

			} else if (currentHandle.classList.contains('e')) {
				container.style.width = rect.width - (posX - e.clientX) + 'px';
				// test
				// headh1.style.width = hh1.width - (posX - e.clientX) + 'px';
				// *tambahan*
				widthStyles = container.style.width;
				heightStyles = container.style.height;

			} else if (currentHandle.classList.contains('sw')) {
				container.style.width = rect.width + (posX - e.clientX) + 'px';
				container.style.height =
					rect.height - (posY - e.clientY) + 'px';
				container.style.left = rect.left - (posX - e.clientX) + 'px';
				// *tambahan*
				widthStyles = container.style.width;
				heightStyles = container.style.height;

			} else if (currentHandle.classList.contains('s')) {
				if (container.clientHeight < 45 && e.movementY < 0) return;
				container.style.height =
					rect.height - (posY - e.clientY) + 'px';
				// *tambahan*
				widthStyles = container.style.width;
				heightStyles = container.style.height;

			} else if (currentHandle.classList.contains('se')) {
				container.style.width = rect.width - (posX - e.clientX) + 'px';
				container.style.height =
					rect.height - (posY - e.clientY) + 'px';
				// *tambahan*
				widthStyles = container.style.width;
				heightStyles = container.style.height;
				console.log('width = ', widthStyles);
				console.log('height = ', heightStyles);

			}
			if (rect.width < 270) {
				container.style.width = '270px';
				widthStyles = container.style.width;
				// container.style.left = rect.left + 'px';
				// let sisi = rect.left;
				// console.log(sisi);
				return;
			}

			posX = e.clientX;
			posY = e.clientY;
		}

		function mouseup() {
			window.removeEventListener('mousemove', mousemove);
			window.removeEventListener('mouseup', mouseup);
			isResizing = false;
		}
	}
}

const ketkon = container.getBoundingClientRect();
console.log(ketkon.width);

if (ketkon.width > 200) {
	console.log('coki Login!');
}

// Menutup file
const tutup = document.querySelector('.close');
tutup.addEventListener('mousedown', tutupFile);

function tutupFile() {
	container.classList.toggle('nodisplay');
	// container.style.display = 'none';
}

// Maximize file
const max = document.querySelector('.maximize');
max.addEventListener('mousedown', maximizeFile);
var adaKlik = false;

function maximizeFile() {
	container.classList.toggle('klik-max');
	adaKlik = container.classList.contains('klik-max');


	if (adaKlik) {
		container.style.top = 0 + 'px';
		container.style.left = 0 + 'px';
		container.style.width = "100%";
		container.style.height = "100vh";
	}
	else if (!adaKlik) {
		container.style.top = topStyles;
		container.style.left = leftStyles;
		container.style.width = widthStyles;
		container.style.height = heightStyles;
	}
}

// membuka suatu folder
const folder = document.querySelector('.folder-img');
folder.addEventListener('dblclick', openFile);

function openFile() {
	container.classList.toggle('nodisplay');
	// container.style.display = "inline-block";
}