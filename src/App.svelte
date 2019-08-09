<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import Bird from './components/bird';
	import Column from './components/column';
	import Modal from './components/modal';
	import { game } from './store';
	
	game.init();

	let isModalShown = true;
	let modalText = 'Press SPACE to start';
	let _timer;
	let testArr = [];

	const gameSubscribe = game.subscribe(value => {
		console.log('game.subscribe app', value)

		if (value) {
			startTimer()
		} else {
			isModalShown = true;
			clearInterval(_timer)
		}
	})

	function onAgreeGameStart() {
		isModalShown = false;
		game.start();
		console.log('game.start()')
	}

	function startTimer() {
		_timer = setInterval(() => {
			testArr = [...testArr, Column]
			console.log(testArr)
		}, 1000);
	}

	// let modalText = 'Press SPACE to start';

	// onMount(() => {
	// 	gravity.init(size.height / 2)
	// })

	// function onGameOver() {

	// 	console.log(isModalShown)
	// 	game.stop();
	// 	isModalShown = true;
	// 	modalText = 'To start game press SPACE';

	// }

</script>

<style>
	.wrapper {
		overflow: hidden;
		position: relative;
		width: 100%;
		height: 100%;
	}
</style>

<div class="wrapper">
	<Bird />

		{#each testArr as arr}
			<svelte:component this={arr} />
		{/each}

  {#if isModalShown}
		<Modal 
			noButtons
			code="Space"
			on:agree={onAgreeGameStart}			
			> {modalText} </Modal>
	{/if}
</div>

