import { readable, writable } from 'svelte/store';
const gravity = createGravity();
const game = createGame();
let _interval;
let size = document.body.getBoundingClientRect();

window.onresize = () => size = document.body.getBoundingClientRect();

function createGame() {
	const { subscribe, set, update } = writable(false);

	return {
		subscribe,
		start: () => {
			set(true)
		},
		stop: () => set(false),
	}

}
function createGravity() {
	const { subscribe, set, update } = writable(0);
	let gameOver = false;
	let center = 0;

	return {
		subscribe,
		increment: () => update(n => n + 1),
		decrement: () => update(n => n - 2.5),
		reset: (e) => set(center),
		start: () => {

		},
		





		set: (n) => set(n),
		run: () => {
			if (!game) return
			console.log(center)
			gravity.set(center);
			gameOver = false;
			_interval = setInterval(() => {
				gravity.decrement();
			}, 10);
		},
		stop: () => {
			clearInterval(_interval);
			// gravity.reset();
			// gravity.set(center);
		},
		jump: () => {

			update(n => n + 100)
			// if (gameOver) return
			// gravity.stop();
			// update(n => n + 100)
			// gravity.run();
		},
		die: () => {
			gravity.reset();
		},
		init: (e) => {
			set(center = e)

			console.log(center)
		}
	};
}


export { gravity, size, game };