// Dragable file
const containerAll = document.querySelectorAll('.container');
const headFileAll = document.querySelectorAll('.head-file');

var styles;
var topStyles;
containerAll.forEach(function (eCon) {
	console.log("container = ", eCon);
	styles = window.getComputedStyle(eCon)
	topStyles = styles.top;
	leftStyles = styles.left;
	console.log('topStyles = ', topStyles);
	console.log('leftStyles =', leftStyles);

	// const container = document.querySelector('.container');
	// const headFile = document.querySelector('.head-file');
	// ***** tambahan
	// var styles = window.getComputedStyle(container);
	// var topStyles = styles.top;
	// var leftStyles = styles.left;

	let isResizing = false;

	for (let i = 0; i < headFileAll.length; i++) {
		console.log('ini', i);
	};

	headFileAll.forEach(function (eHead) {

		eHead.addEventListener('mousedown', mousedown);

		function mousedown(eDDrag) {
			console.log("ini ddrag = ", eDDrag.target.parentElement);
			window.addEventListener('mousemove', mousemove);
			window.addEventListener('mouseup', mouseup);

			let posX = eDDrag.clientX;
			let posY = eDDrag.clientY;

			function mousemove(eMDrag) {
				if (!isResizing) {
					let nextX = posX - eMDrag.clientX;
					let nextY = posY - eMDrag.clientY;

					const rect = eCon.getBoundingClientRect();

					eCon.style.left = rect.left - nextX + 'px';
					eCon.style.top = rect.top - nextY + 'px';
					leftStyles = eCon.style.left;
					topStyles = eCon.style.top;

					posX = eMDrag.clientX;
					console.log('posX = ', posX);
					console.log('leftStyles =', leftStyles);
					posY = eMDrag.clientY;
					console.log('posY = ', posY);
					console.log('topStyles = ', topStyles);

				}
			}

			function mouseup() {
				window.removeEventListener('mousemove', mousemove);
				window.removeEventListener('mouseup', mouseup);
			}
		}
	});


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
				const rect = eCon.getBoundingClientRect();
				// test
				// const hh1 = headh1.getBoundingClientRect();

				if (currentHandle.classList.contains('nw')) {
					eCon.style.width = rect.width + (posX - e.clientX) + 'px';
					eCon.style.height =
						rect.height + (posY - e.clientY) + 'px';
					eCon.style.left = rect.left - (posX - e.clientX) + 'px';
					eCon.style.top = rect.top - (posY - e.clientY) + 'px';
					// if (rect.width < 245) {
					//     mouseup();
					// }
					// *tambahan*
					widthStyles = eCon.style.width;
					heightStyles = eCon.style.height;

				} else if (currentHandle.classList.contains('n')) {
					eCon.style.height =
						rect.height + (posY - e.clientY) + 'px';

					//tambahan
					let height = parseFloat(eCon.style.height.replace('px', ''));

					eCon.style.top = height > 50 ? rect.top - (posY - e.clientY) + 'px' : rect.top;
					// *tambahan*
					widthStyles = eCon.style.width;
					heightStyles = eCon.style.height;

				} else if (currentHandle.classList.contains('ne')) {
					eCon.style.width = rect.width - (posX - e.clientX) + 'px';
					eCon.style.height =
						rect.height + (posY - e.clientY) + 'px';
					eCon.style.top = rect.top - (posY - e.clientY) + 'px';
					// *tambahan*
					widthStyles = eCon.style.width;
					heightStyles = eCon.style.height;

				} else if (currentHandle.classList.contains('w')) {
					let width = parseFloat(eCon.style.width.replace('px', ''));

					eCon.style.left =
						width > 270
							? rect.left - (posX - e.clientX) + 'px'
							: rect.left;
					eCon.style.width = rect.width + (posX - e.clientX) + 'px';
					// *tambahan*
					widthStyles = eCon.style.width;
					heightStyles = eCon.style.height;

				} else if (currentHandle.classList.contains('e')) {
					eCon.style.width = rect.width - (posX - e.clientX) + 'px';
					// test
					// headh1.style.width = hh1.width - (posX - e.clientX) + 'px';
					// *tambahan*
					widthStyles = eCon.style.width;
					heightStyles = eCon.style.height;

				} else if (currentHandle.classList.contains('sw')) {
					eCon.style.width = rect.width + (posX - e.clientX) + 'px';
					eCon.style.height =
						rect.height - (posY - e.clientY) + 'px';
					eCon.style.left = rect.left - (posX - e.clientX) + 'px';
					// *tambahan*
					widthStyles = eCon.style.width;
					heightStyles = eCon.style.height;

				} else if (currentHandle.classList.contains('s')) {
					if (eCon.clientHeight < 45 && e.movementY < 0) return;
					eCon.style.height =
						rect.height - (posY - e.clientY) + 'px';
					// *tambahan*
					widthStyles = eCon.style.width;
					heightStyles = eCon.style.height;

				} else if (currentHandle.classList.contains('se')) {
					eCon.style.width = rect.width - (posX - e.clientX) + 'px';
					eCon.style.height =
						rect.height - (posY - e.clientY) + 'px';
					// *tambahan*
					widthStyles = eCon.style.width;
					heightStyles = eCon.style.height;
					console.log('width = ', widthStyles);
					console.log('height = ', heightStyles);

				}
				if (rect.width < 270 || rect.height < 200) {
					if (rect.width < 270) {
						eCon.style.width = '270px';
						widthStyles = eCon.style.width;
					}
					else if (rect.height < 200) {
						eCon.style.height = '200px';
						heightStyles = eCon.style.height;
					}
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

	const ketkon = eCon.getBoundingClientRect();
	console.log(ketkon.width);

	if (ketkon.width > 200) {
		console.log('coki Login!');
	}

	// Menutup file
	const tutup = document.querySelectorAll('.close');

	tutup.forEach(function (eTutup) {

		eTutup.addEventListener('mousedown', tutupFile);

		function tutupFile() {
			eCon.classList.add('nodisplay');
			// container.style.display = 'none';
		}
	});

	// Maximize file
	const max = document.querySelectorAll('.maximize');

	max.forEach(function (eMax) {

		eMax.addEventListener('mousedown', maximizeFile);
		var adaKlik = false;

		function maximizeFile() {
			eCon.classList.toggle('klik-max');
			adaKlik = eCon.classList.contains('klik-max');


			if (adaKlik) {
				eCon.style.top = 0 + 'px';
				eCon.style.left = 0 + 'px';
				eCon.style.width = "100%";
				eCon.style.height = "100vh";
			}
			else if (!adaKlik) {
				eCon.style.top = topStyles;
				eCon.style.left = leftStyles;
				eCon.style.width = widthStyles;
				eCon.style.height = heightStyles;
			}
		}
	});

	// membuka suatu folder
	const folder = document.querySelectorAll('.folder-img');

	folder.forEach(function (efImg) {

		efImg.addEventListener('dblclick', openFile);
		var terbuka = false;

		function openFile() {
			eCon.classList.remove('nodisplay');
			eCon.style.zIndex = '10';
			terbuka = true;
			if (terbuka) {
				// alert('buka');
				let elementKedip = document.querySelector('.isi .head-file');
				let bgcasal = elementKedip.style.backgroundColor;
				folder.addEventListener('mousedown', function () {
					elementKedip.style.backgroundColor = "white";
				});
				folder.addEventListener('mouseup', function () {
					elementKedip.style.backgroundColor = bgcasal;
				});
			}
			// eCon.style.display = "inline-block";
		}
	});
});