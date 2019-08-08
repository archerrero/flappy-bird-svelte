<script>
	import { beforeUpdate, createEventDispatcher } from 'svelte';
  import { gravity, size, game } from '../store';

  const dispatch = createEventDispatcher();
  
  let _gravity;
  let _game;

  const unSubscribeGravity = gravity.subscribe(c => {
    _gravity = c;
    if (!_game) return 

    if (c > size.height || c < 0 ) {
      console.log('123')    
      gravity.stop()  
		  game.stop();
      dispatch('gameOver')
    }
  })

  const unSubscribeGame = game.subscribe(value => {
    _game = value;
    if (value) {
      gravity.run();
    } else {
		  game.stop();
      gravity.set(size.height / 2);
    }
  })


  function onKeypress() {
    gravity.jump();
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
  style="bottom: {_gravity}px; left: {size.width / 10}px">
  {_gravity}
</div>