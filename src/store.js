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

	return {
		subscribe,
		init: () => {
			bird.setPosition(bound)
			column.setPosition(bound)
		},
		start: () => {
			set(true)
			bird.setPosition(bound)
			bird.start()
		},
		end: () => {
			set(false)
			bird.stop();
		},
	}
}

function boundingClientRect(params) {
	return document.body.getBoundingClientRect();
}

export { bird, column, game, bound };