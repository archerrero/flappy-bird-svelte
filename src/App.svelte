<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import Bird from './components/bird';
	import Column from './components/column';
	import Modal from './components/modal';
	import { gravity, size, game } from './store';
	

	let isModalShown = true;
	let modalText = 'Press SPACE to start';

	onMount(() => {
		gravity.init(size.height / 2)
	})

	function onGameOver() {
		gravity.stop();
		gravity.set(size.height / 2);
		game.stop();
		isModalShown = true;
		modalText = 'To start game press SPACE'

	}

	function onAgreeGameStart() {
		console.log('123123123 ')
		isModalShown = false;
		gravity.set(size.height / 2);
		game.start();
	}
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
	<Bird 
		game={$game}
		on:gameOver={onGameOver}/>

	<Column
		game={$game}
		on:gameOver={onGameOver} />

  {#if isModalShown}
		<Modal 
			noButtons
			code="Space"
			on:agree={onAgreeGameStart}
			
			> {modalText} </Modal>
	{/if}
</div>

