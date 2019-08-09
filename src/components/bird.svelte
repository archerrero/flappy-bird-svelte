<script>
	import { beforeUpdate, createEventDispatcher } from 'svelte';
  import { bird, game, bound } from '../store';

  import { tweened } from 'svelte/motion';
  import { linear } from 'svelte/easing';


  const motion = tweened($bird.bottom, {
    duration: 100,
	  easing: linear
  })

  const subscribeBird = bird.subscribe(value => {
    $motion = value.bottom;
  })

  const subscribeMotion = motion.subscribe(value => {
    if (value <= 0) game.end();
    if (value + 50 >= bound.height) game.end();
  })

  function onKeypress() {
    bird.jump();
  }


</script>

<style>
  div {
    background: red;
    width: 50px;
    height: 50px;
    position: absolute;
  }
</style>

<svelte:body
	on:keypress|once="{onKeypress}" />

<div 
  style="bottom: {$motion}px; left: {$bird.left}px">
  {$bird.left} /
  {$bird.bottom}
</div>