<script>
	import { onMount, createEventDispatcher } from 'svelte';
	import Bird from './components/bird';
	import Column from './components/column';
	import Modal from './components/modal';
	import { game } from './store';
	
	game.init();

	let isModalShown = true;
	let modalData = {
		text: 'Press HERE to start',
		agreeText: 'here'
	}
	let _timer;
	let columns = [];

	let backgroundX = 0;

	const gameSubscribe = game.subscribe(value => {
		if (value) {
			columns = Array(0);
			startTimer()
			moveBackground()
		} else {
			isModalShown = true;
			clearInterval(_timer)
		}
	})

	function onAgreeGameStart() {
		isModalShown = false;
		game.start();
	}

	function startTimer() {
		_timer = setInterval(() => {
			columns = [...columns, Column]
			// console.log(columns)
		}, 2000);
	}

	function moveBackground() {
		setInterval(() => {
			backgroundX -= 1;
		}, 50);
	}

</script>

<style>
	.wrapper {
		overflow: hidden;
		position: relative;
		width: 100%;
		height: 100%;
		background-image: repeating-radial-gradient(#b2ebf2 10px, #e0f7fa 20px);
    background-size: 100px 100px;
    background-position: 0 0px;
	}
</style>

<div 
	class="wrapper"
	style="background-position: {backgroundX}px 0px">

	{columns.length}
	<Bird />

	{#each columns as arr}
		<svelte:component this={arr} />
	{/each}

  {#if isModalShown}
		<Modal 
			{...modalData}
			on:agree={onAgreeGameStart}			
			/>
	{/if}
</div>

