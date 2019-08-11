<script>
	import { beforeUpdate, createEventDispatcher } from 'svelte';
  import { bird, game, bound } from '../store';

  import { tweened } from 'svelte/motion';
  import { linear } from 'svelte/easing';

  let _game;
  let lastMotion = $bird.bottom;
  let angle = 0;
  let coefficient = 1;

  const motion = tweened($bird.bottom, {
    duration: 100,
	  easing: linear
  })

  const gameSubscribe = game.subscribe(value => {
    _game = value;
    angle = 0
  })

  const subscribeBird = bird.subscribe(value => {
    $motion = value.bottom;
  })

  const subscribeMotion = motion.subscribe(value => {

    if(value > lastMotion) {
      angle = -45;
    } else if (value < lastMotion) {
      angle += coefficient;
    }

    if (value <= 0) game.end();
    if (value + 50 >= bound.height) game.end();
    lastMotion = value;
  })

  function onKeypress() {
    if (_game) bird.jump();
  }
</script>

<style>
  div {
    /* background: red; */
    width: 50px;
    height: 50px;
    position: absolute;
    transition: .1s  transform ;
  }
</style>

<svelte:body
	on:keypress="{onKeypress}" 
	on:click="{onKeypress}" />

<div 
  style="bottom: {$motion}px; 
         left: {$bird.left}px;
         transform: rotate({angle}deg);">
         
  <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg">
    <path fill="#802812" d="M37 33s-2 8-9 4l-4-3 13-1zM25 33l-2 1s-6 3-9 1-3-7 2-8l9 6zM37 17s-2-8-9-4l-4 3 13 1zM25 17l-2-1s-6-3-9-1-3 7 2 8l9-6z"/>
    <path fill="#FF5023" d="M10 25c0 3 9 11 19 11 15 0 21-11 21-11s-6-11-21-11c-10 0-19 8-19 11z"/>
    <path fill="#FF9811" d="M29 36c15 0 21-11 21-11s-6-11-21-11"/>
    <circle fill="#802812" r="10" cy="510" cx="-69" transform="matrix(-.14662 0 0 .15352 34 -55)"/>
    <path fill="#FF5023" d="M4 19l12 3v6L4 31s-4-1-4-6 4-6 4-6z"/>
    <path fill="#FF9811" d="M28 25c0 4-1 7-3 10h-3a17 17 0 0 0 0-20h3c2 3 3 6 3 10z"/>
    <path fill="#FFDA44" d="M39 16l2 1c-2 2-3 5-3 8s1 6 3 8l-2 1a13 13 0 0 1 0-18z"/>
    <path fill="#FF9811" d="M13 25v4l-4 1 1-5-1-5 4 1v4z"/>
  </svg>
</div>