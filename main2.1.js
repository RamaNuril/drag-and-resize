// Dragable file
const containerAll = document.querySelectorAll('.container');
const headFileAll = document.querySelectorAll('.head-file');
const controlBox = document.querySelectorAll('.control-box');
const box = document.querySelectorAll('.box');

var mobile;


// for mobile
if (window.innerWidth <= 768) {

	box.forEach(function (cbox) {
		// console.log('ini parent box = ', cbox.parentElement);
		if (cbox.parentElement.classList.contains('cvF')) {
			cbox.parentElement.remove();
		}
		else if (!cbox.classList.contains('close')) {
			// console.log('ini class', cbox);
			// cbox.style.opacity = '0';
			// cbox.style.zIndex = '-10';
			// cbox.remove();
			cbox.style.opacity = 0;
			cbox.style.pointerEvents = "none";
		}
	});


	// membuat display menjadi maximize
	containerAll.forEach(function (c) {
		if (c.classList.contains('cv-img')) {
			c.classList.remove('nodisplay');
			c.style.top = 0 + 'px';
			c.style.left = 0 + 'px';
			c.style.width = "100%";
			c.style.height = "100vh";
		}
	});
	mobile = true;
};

var styles;
var topStyles;

// Untuk mengecek apakah kedua Array memiliki value sama,
// Jika ya return true
function checkArray(Array1, Array2) {
	for (let i = 0; i < Array1.length; i++) {
		if (Array2.includes(Array1[i])) {
			return true;
		}
	}
	return false;
}

// untuk mencari nilai array
function findArrayValue(Array1, Array2) {
	const emptyVarr = Array1.filter(value => Array2.includes(value));
	return emptyVarr;
}

for (let i = 0; i < containerAll.length; i++) {
	// console.log("container = ", containerAll[i]);
	styles = window.getComputedStyle(containerAll[i]);
	topStyles = styles.top;
	leftStyles = styles.left;
	// console.log('topStyles = ', topStyles);
	// console.log('leftStyles =', leftStyles);

	// const container = document.querySelector('.container');
	// const headFile = document.querySelector('.head-file');
	// ***** tambahan
	// var styles = window.getComputedStyle(container);
	// var topStyles = styles.top;
	// var leftStyles = styles.left;

	let isResizing = false;

	// containerAll[i].addEventListener('click', function () {
	// 	let tambahZindex = 1;
	// 	containerAll[i].style.zIndex += tambahZindex;
	// });

	for (let i = 0; i < headFileAll.length; i++) {
		// console.log('ini', i);
	};

	// test
	const hand = containerAll[i].querySelectorAll('.handler');
	for (let i = 0; i < hand.length; i++) {
		// console.log('ini hand!!! ', hand);
	}

	for (let i = 0; i < headFileAll.length; i++) {
		headFileAll[i].addEventListener('mousedown', mousedown);

		function mousedown(eDDrag) {
			// console.log("ini ddrag = ", eDDrag.target.parentElement);
			window.addEventListener('mousemove', mousemove);
			window.addEventListener('mouseup', mouseup);

			let posX = eDDrag.clientX;
			let posY = eDDrag.clientY;

			function mousemove(eMDrag) {
				if (!isResizing) {
					let nextX = posX - eMDrag.clientX;
					let nextY = posY - eMDrag.clientY;

					const rect = containerAll[i].getBoundingClientRect();

					containerAll[i].style.left = rect.left - nextX + 'px';
					containerAll[i].style.top = rect.top - nextY + 'px';
					leftStyles = containerAll[i].style.left;
					topStyles = containerAll[i].style.top;

					posX = eMDrag.clientX;
					// console.log('posX = ', posX);
					// console.log('leftStyles =', leftStyles);
					posY = eMDrag.clientY;
					// console.log('posY = ', posY);
					// console.log('topStyles = ', topStyles);

				}
			}

			function mouseup() {
				window.removeEventListener('mousemove', mousemove);
				window.removeEventListener('mouseup', mouseup);
			}
		}
	};


	// Resizeble File
	const handlers = containerAll[i].querySelectorAll('.handler');
	let currentHandle;

	// *** tambahan
	// var widthStyles = parseInt(styles.width);
	var widthStyles = styles.width;
	// var heightStyles = parseInt(styles.height);
	var heightStyles = styles.height;
	// console.log('widthStyles = ', widthStyles);
	// console.log('heightStyles = ', heightStyles);

	// for (let i = 0; i < handlers.length; i++) {

	// }

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
				const rect = containerAll[i].getBoundingClientRect();
				// test
				// const hh1 = headh1.getBoundingClientRect();

				// fungsi untuk menentukan batas ukuran dari folder
				function batasWH(lebar, tinggi) {
					if (currentHandle.classList.contains('nw')) {
						containerAll[i].style.width = rect.width + (posX - e.clientX) + 'px';
						containerAll[i].style.height =
							rect.height + (posY - e.clientY) + 'px';
						containerAll[i].style.left = rect.left - (posX - e.clientX) + 'px';
						containerAll[i].style.top = rect.top - (posY - e.clientY) + 'px';
						// if (rect.width < 245) {
						//     mouseup();
						// }
						// *tambahan*
						widthStyles = containerAll[i].style.width;
						heightStyles = containerAll[i].style.height;

					} else if (currentHandle.classList.contains('n')) {
						containerAll[i].style.height =
							rect.height + (posY - e.clientY) + 'px';

						//tambahan
						let height = parseFloat(containerAll[i].style.height.replace('px', ''));

						containerAll[i].style.top = height > tinggi ? rect.top - (posY - e.clientY) + 'px' : rect.top;
						// *tambahan*
						widthStyles = containerAll[i].style.width;
						heightStyles = containerAll[i].style.height;

					} else if (currentHandle.classList.contains('ne')) {
						containerAll[i].style.width = rect.width - (posX - e.clientX) + 'px';
						containerAll[i].style.height =
							rect.height + (posY - e.clientY) + 'px';
						containerAll[i].style.top = rect.top - (posY - e.clientY) + 'px';
						// *tambahan*
						widthStyles = containerAll[i].style.width;
						heightStyles = containerAll[i].style.height;

					} else if (currentHandle.classList.contains('w')) {
						let width = parseFloat(containerAll[i].style.width.replace('px', ''));

						containerAll[i].style.left =
							width > lebar
								? rect.left - (posX - e.clientX) + 'px'
								: rect.left;
						containerAll[i].style.width = rect.width + (posX - e.clientX) + 'px';
						// *tambahan*
						widthStyles = containerAll[i].style.width;
						heightStyles = containerAll[i].style.height;

					} else if (currentHandle.classList.contains('e')) {
						containerAll[i].style.width = rect.width - (posX - e.clientX) + 'px';
						// test
						// headh1.style.width = hh1.width - (posX - e.clientX) + 'px';
						// *tambahan*
						widthStyles = containerAll[i].style.width;
						heightStyles = containerAll[i].style.height;

					} else if (currentHandle.classList.contains('sw')) {
						containerAll[i].style.width = rect.width + (posX - e.clientX) + 'px';
						containerAll[i].style.height =
							rect.height - (posY - e.clientY) + 'px';
						containerAll[i].style.left = rect.left - (posX - e.clientX) + 'px';
						// *tambahan*
						widthStyles = containerAll[i].style.width;
						heightStyles = containerAll[i].style.height;

					} else if (currentHandle.classList.contains('s')) {
						if (containerAll[i].clientHeight < 45 && e.movementY < 0) return;
						containerAll[i].style.height =
							rect.height - (posY - e.clientY) + 'px';
						// *tambahan*
						widthStyles = containerAll[i].style.width;
						heightStyles = containerAll[i].style.height;

					} else if (currentHandle.classList.contains('se')) {
						containerAll[i].style.width = rect.width - (posX - e.clientX) + 'px';
						containerAll[i].style.height =
							rect.height - (posY - e.clientY) + 'px';
						// *tambahan*
						widthStyles = containerAll[i].style.width;
						heightStyles = containerAll[i].style.height;
						// console.log('width = ', widthStyles);
						// console.log('height = ', heightStyles);

					}
					if (rect.width < lebar || rect.height < tinggi) {
						if (rect.width < lebar) {
							containerAll[i].style.width = `${lebar}px`;
							widthStyles = containerAll[i].style.width;
						}
						else if (rect.height < tinggi) {
							containerAll[i].style.height = `${tinggi}px`;
							heightStyles = containerAll[i].style.height;
						}
						return;
					}
				}

				//move folder cv
				if (containerAll[i].classList.contains('cv-img')) {
					console.log("yas ada cv-img");
					batasWH(270, 200);
				}
				//move folder profile
				else if (containerAll[i].classList.contains('profile-img')) {
					console.log('yes ada profile-img')
					batasWH(600, 450);
				}
				//move folder experiences
				else if (containerAll[i].classList.contains('ex-img')) {
					console.log('yes ada ex-img')
					batasWH(500, 500);
				}
				// move folder skill
				else if (containerAll[i].classList.contains('skill-img')) {
					console.log('yes ada ex-img')
					batasWH(400, 350);
				}
				//move folder education
				// else if (containerAll[i].classList.contains('ed-img')) {
				// 	console.log('yes ada ed-img')
				// 	batasWH(350, 300);
				// }



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

	const ketkon = containerAll[i].getBoundingClientRect();
	// console.log(ketkon.width);

	if (ketkon.width > 200) {
		// console.log('coki Login!');
	}

	// Menutup file
	// const tutup = document.querySelectorAll('.close');

	// tutup.forEach(function (eTutup) {

	// 	eTutup.addEventListener('mousedown', tutupFile);


	// 	function tutupFile() {
	// 		containerAll[i].classList.add('nodisplay');
	// 		// container.style.display = 'none';
	// 	}
	// });

	// Maximize file
	// const max = document.querySelectorAll('.maximize');

	// max.forEach(function (eMax) {

	// 	eMax.addEventListener('mousedown', maximizeFile);
	// 	var adaKlik = false;
	// 	// console.log('ini adalah eMax = ', eMax.parentElement.parentElement.parentElement.parentElement);

	// 	function maximizeFile(eM) {

	// 		containerAll[i].classList.toggle('klik-max');
	// 		adaKlik = containerAll[i].classList.contains('klik-max');

	// 		console.log('ini eM = ', eM.target.parentElement.parentElement.parentElement.parentElement);

	// 		if (adaKlik) {
	// 			containerAll[i].style.top = 0 + 'px';
	// 			containerAll[i].style.left = 0 + 'px';
	// 			containerAll[i].style.width = "100%";
	// 			containerAll[i].style.height = "100vh";
	// 		}
	// 		else if (!adaKlik) {
	// 			containerAll[i].style.top = topStyles;
	// 			containerAll[i].style.left = leftStyles;
	// 			containerAll[i].style.width = widthStyles;
	// 			containerAll[i].style.height = heightStyles;
	// 		}
	// 	}
	// });

	// membuka suatu folder
	// const folder = document.querySelectorAll('.folder-img');

	// for (let i = 0; i < folder.length; i++) {
	// 	folder[i].addEventListener('dblclick', openFile);
	// 	var terbuka = false;

	// 	function openFile() {
	// 		containerAll[i].classList.remove('nodisplay');
	// 		containerAll[i].style.zIndex = '10';
	// 		terbuka = true;
	// 		if (terbuka) {
	// 			// alert('buka');
	// 			let elementKedip = document.querySelector('.isi .head-file');
	// 			let bgcasal = elementKedip.style.backgroundColor;
	// 			folder[i].addEventListener('mousedown', function () {
	// 				elementKedip.style.backgroundColor = "white";
	// 			});
	// 			folder[i].addEventListener('mouseup', function () {
	// 				elementKedip.style.backgroundColor = bgcasal;
	// 			});
	// 		};
	// 		// containerAll[i].style.display = "inline-block";
	// 	};
	// };
};


// membuka file
const folder = document.querySelectorAll('.folder-img');
var terbuka = false;

for (let i = 0; i < folder.length; i++) {
	// folder[i].addEventListener('dblclick', openFile);
	// mencoba pake klik
	folder[i].addEventListener('click', openFile);


	function openFile(eOP) {
		// console.log('ini eOP', eOP.target.classList);

		//*
		let eopArr = Array.from(eOP.target.classList);
		// console.log('ini eopArr = ', eopArr);

		let classTerpilih;

		for (let i = 0; i < containerAll.length; i++) {
			let conArr = Array.from(containerAll[i].classList);
			// console.log('ini conArr', conArr);
			if (checkArray(eopArr, conArr)) {
				// console.log('AKU HIDUP!!!', findArrayValue(eopArr, conArr));
				classTerpilih = findArrayValue(eopArr, conArr)[0];
				// console.log('ini yg terpilih = ', classTerpilih);
			}
		}

		if (containerAll[i].classList.contains(classTerpilih)) {

			// for mobile
			if (mobile) {

				containerAll[i].classList.remove('nodisplay');
				containerAll[i].style.top = 0 + 'px';
				containerAll[i].style.left = 0 + 'px';
				containerAll[i].style.width = "100%";
				containerAll[i].style.height = "100vh";
			}

			containerAll[i].classList.remove('nodisplay');
			containerAll[i].style.zIndex = '10';
			terbuka = true;

			if (terbuka) {
				// alert('buka');
				// *manipulasi elementKedip!!! (PR)
				let elementKedip = document.querySelectorAll('.head-file');
				// console.log('ini elementKedip = ', elementKedip.classList);
				for (let i = 0; i < elementKedip.length; i++) {
					if (elementKedip[i].classList.contains(classTerpilih)) {
						let bgcAsal = elementKedip[i].style.backgroundColor;
						folder[i].addEventListener('mousedown', function () {
							elementKedip[i].style.backgroundColor = "white";
						});
						folder[i].addEventListener('mouseup', function () {
							elementKedip[i].style.backgroundColor = bgcAsal;
						});

					}
					let anakHFile = Array.from(elementKedip[i].classList);
					// console.log('ini anakHFile = ', anakHFile);
				}
				// let bgcasal = elementKedip.style.backgroundColor;
				// folder[i].addEventListener('mousedown', function () {
				// 	elementKedip.style.backgroundColor = "white";
				// });
				// folder[i].addEventListener('mouseup', function () {
				// 	elementKedip.style.backgroundColor = bgcasal;
				// });
			};
		}
		else {
			containerAll[i].style.zIndex = '5';
		}
	};
};

// maximize file
const max = document.querySelectorAll('.maximize');

// membuat ikut font membesar pada beberapa folder
const fontGede = document.querySelector(".isi-file.pF");
const fontAwal = window.getComputedStyle(fontGede).fontSize;
console.log("ini font awal =", fontAwal);

max.forEach(function (eMax) {

	eMax.addEventListener('mousedown', maximizeFile);
	var adaKlik = false;

	function maximizeFile(eM) {
		let conEM = eM.target.parentElement.parentElement.parentElement.parentElement;

		conEM.classList.toggle('klik-max');
		adaKlik = conEM.classList.contains('klik-max');


		if (adaKlik) {
			conEM.style.top = 0 + 'px';
			conEM.style.left = 0 + 'px';
			conEM.style.width = "100%";
			conEM.style.height = "100vh";
			fontGede.style.fontSize = "20px";
		}
		else if (!adaKlik) {
			conEM.style.top = topStyles;
			conEM.style.left = leftStyles;
			conEM.style.width = widthStyles;
			conEM.style.height = heightStyles;
			fontGede.style.fontSize = fontAwal;
		}
	}
});

const tutup = document.querySelectorAll('.close');

tutup.forEach(function (eTutup) {

	eTutup.addEventListener('mousedown', tutupFile);

	function tutupFile(eTutup2) {

		let conET = eTutup2.target.parentElement.parentElement.parentElement.parentElement;

		conET.classList.add('nodisplay');
		// container.style.display = 'none';
		terbuka = false;
	}
});

// *PR
// mengubah zIndex container file yang diklik
// agar tampilan ada paling depan.
window.addEventListener('mousedown', function (e) {
	// console.log('INI ADALAH E = ', e.target, " Ini Container[0]", containerAll[0]);
	var zNambah = 10;
	let adaCon = e.target.parentElement;
	for (let i = 0; i < containerAll.length; i++) {
		var zMin = 1;
		if (adaCon == containerAll[i]) {
			// this.alert('sama');
			// containerAll[i].style.zIndex = (parseInt(containerAll[i].style.zIndex) + zNambah).toString();
			containerAll[i].style.zIndex = zNambah.toString();
		}
		else if (adaCon.parentElement == containerAll[i]) {
			// containerAll[i].style.zIndex = (parseInt(containerAll[i].style.zIndex) + zNambah).toString();
			containerAll[i].style.zIndex = zNambah.toString();
		}
		else if (adaCon.parentElement.parentElement == containerAll[i]) {
			// containerAll[i].style.zIndex = (parseInt(containerAll[i].style.zIndex) + zNambah).toString();
			containerAll[i].style.zIndex = zNambah.toString();
		}
		else if (adaCon.parentElement.parentElement.parentElement == containerAll[i]) {
			// containerAll[i].style.zIndex = (parseInt(containerAll[i].style.zIndex) + zNambah).toString();
			containerAll[i].style.zIndex = zNambah.toString();
		}
		else {
			// containerAll[i].style.zIndex = (parseInt(containerAll[i].style.zIndex) - zNambah).toString();
			containerAll[i].style.zIndex -= zMin.toString();
		}
	}

});
