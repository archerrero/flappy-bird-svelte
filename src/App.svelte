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
	let bestResults;

	const gameSubscribe = game.subscribe(value => {
		if (value) {
			columns = Array(0);
			startTimer()
			moveBackground()
		} else {
			isModalShown = true;
			clearInterval(_timer)
			bestResults = columns.length;
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
		background-image: url(./../public/seaweed.svg) , repeating-radial-gradient(rgba(178, 235, 242, .5) 10px, rgba(224, 247, 250, .5) 20px) ;
    background-size: 300px 300px, 100px 100px;
		background-position: 100% 100%, 0 0px;
		background-repeat: repeat-x, repeat;
	}
	.top-info {
		padding: 16px;
		display: flex;
    align-items: center;
    justify-content: flex-end;
	}
	.top-info--count {
		font-size: 2rem;	
		color: #fff;
		text-shadow: 2px 2px 0px #000, -2px 2px 0px #000, 2px -2px 0px #000, -2px -2px 0px #000;
	}
	.top-info--best {
		color: #fff;
		text-shadow: 2px 2px 0px #FF5023, -2px 2px 0px #FF5023, 2px -2px 0px #FF5023, -2px -2px 0px #FF5023;
		margin-right: 16px;
	}
</style>

<div 
	class="wrapper"
	style="background-position: {backgroundX * 2}px 100%, {backgroundX}px 0px">
	<div class="top-info">
		{#if columns.length > bestResults}
			<span 
				class="top-info--best"
				style="opacity: {backgroundX % 5 ? .5 : 1}">BEST RECORD</span>
		{/if}
		<span class="top-info--count">{columns.length}</span>
	</div>
	
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

