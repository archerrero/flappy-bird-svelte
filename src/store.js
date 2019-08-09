import { writable } from 'svelte/store';
import bird from './store/bird';
import column from './store/column';

const game = createGame();
let bound = boundingClientRect();


window.onresize = () => {
	bound = boundingClientRect();
}


function createGame() {
	const { subscribe, set, update } = writable(false);
	let _interval;

	return {
		subscribe,
		init: () => {
			bird.setPosition(bound)
			column.setPosition(bound)
		},
		start: () => {
			set(true)
			bird.setPosition(bound)
			_interval = setInterval(() => {
				bird.gravity(Math.PI);
				column.movement(Math.PI)
			}, 10);
		},
		end: () => {
			set(false)
			clearInterval(_interval);
			// alert('Game over')
		},
		reset: () => {

		}
	}
}

function boundingClientRect(params) {
	return document.body.getBoundingClientRect();
}















// const gravity = createGravity();
// // const game = createGame();
// let _interval;
// let size = document.body.getBoundingClientRect();

// window.onresize = () => size = document.body.getBoundingClientRect();

// function createGame() {
// 	const { subscribe, set, update } = writable(false);

// 	return {
// 		subscribe,
// 		start: () => {
// 			set(true);
// 			gravity.run();
// 		},
// 		stop: () => {
// 			set(false);
// 			gravity.stop();
// 			gravity.set(size.height / 2);
// 		},
// 	}

// }
// function createGravity() {
// 	const { subscribe, set, update } = writable(0);
// 	let gameOver = false;
// 	let center = 0;

// 	return {
// 		subscribe,
// 		increment: () => update(n => n + 1),
// 		decrement: () => update(n => n - 2.5),
// 		reset: (e) => set(center),
// 		start: () => {

// 		},
		





// 		set: (n) => set(n),
// 		run: () => {
// 			if (!game) return
// 			console.log(center)
// 			gravity.set(center);
// 			gameOver = false;
// 			_interval = setInterval(() => {
// 				gravity.decrement();
// 			}, 10);
// 		},
// 		stop: () => {
// 			clearInterval(_interval);
// 			// gravity.reset();
// 			// gravity.set(center);
// 		},
// 		jump: () => {

// 			update(n => n + 100)
// 			// if (gameOver) return
// 			// gravity.stop();
// 			// update(n => n + 100)
// 			// gravity.run();
// 		},
// 		die: () => {
// 			gravity.reset();
// 		},
// 		init: (e) => {
// 			set(center = e)

// 			console.log(center)
// 		}
// 	};
// }


export { bird, column, game, bound };