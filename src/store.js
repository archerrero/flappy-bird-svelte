import { readable, writable } from 'svelte/store';
const gravity = createGravity();
let _interval;

function createGravity() {
	const { subscribe, set, update } = writable(0);



	return {
		subscribe,
		increment: () => update(n => n + 1),
		decrement: () => update(n => n - 2.5),
		reset: (e) => set(e ? e : 0),
		set: (n) => set(n),
		run: () => {
			_interval = setInterval(() => {
				gravity.decrement();
			}, 10);
		},
		stop: () => {
			clearInterval(_interval);

		},
		jump: () => {
			gravity.stop();
			update(n => n + 100)
			gravity.run();
		},
		die: () => {
			gravity.reset();
		}
	};
}

export { gravity };