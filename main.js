// Dragable file
const container = document.querySelector('.container');
const headFile = document.querySelector('.head-file');

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

			posX = e.clientX;
			posY = e.clientY;
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

			if (currentHandle.classList.contains('nw')) {
				container.style.width = rect.width + (posX - e.clientX) + 'px';
				container.style.height =
					rect.height + (posY - e.clientY) + 'px';
				container.style.left = rect.left - (posX - e.clientX) + 'px';
				container.style.top = rect.top - (posY - e.clientY) + 'px';
				// if (rect.width < 245) {
				//     mouseup();
				// }
			} else if (currentHandle.classList.contains('n')) {
				container.style.height =
					rect.height + (posY - e.clientY) + 'px';
				container.style.top = rect.top - (posY - e.clientY) + 'px';
			} else if (currentHandle.classList.contains('ne')) {
				container.style.width = rect.width - (posX - e.clientX) + 'px';
				container.style.height =
					rect.height + (posY - e.clientY) + 'px';
				container.style.top = rect.top - (posY - e.clientY) + 'px';
			} else if (currentHandle.classList.contains('w')) {
				let width = parseFloat(container.style.width.replace('px', ''));

				container.style.left =
					width > 255
						? rect.left - (posX - e.clientX) + 'px'
						: rect.left;
				container.style.width = rect.width + (posX - e.clientX) + 'px';
			} else if (currentHandle.classList.contains('e')) {
				container.style.width = rect.width - (posX - e.clientX) + 'px';
			} else if (currentHandle.classList.contains('sw')) {
				container.style.width = rect.width + (posX - e.clientX) + 'px';
				container.style.height =
					rect.height - (posY - e.clientY) + 'px';
				container.style.left = rect.left - (posX - e.clientX) + 'px';
			} else if (currentHandle.classList.contains('s')) {
				if (container.clientHeight < 45 && e.movementY < 0) return;
				container.style.height =
					rect.height - (posY - e.clientY) + 'px';
			} else if (currentHandle.classList.contains('se')) {
				container.style.width = rect.width - (posX - e.clientX) + 'px';
				container.style.height =
					rect.height - (posY - e.clientY) + 'px';
			}
			if (rect.width < 250) {
				container.style.width = '250px';
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
	container.style.display = 'none';
}
