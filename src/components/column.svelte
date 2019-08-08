<script>
	import { beforeUpdate, onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { gravity, size, game } from '../store';
  import { tweened } from 'svelte/motion';
  import { linear } from 'svelte/easing';

  // export let game = false;

  // TODO: clear code
  const dispatch = createEventDispatcher();

  let gameOver = false;
  let top;
  let bottom;
  let left;
  let timer;
  let column;
  let removed = false;
  let gap = 200;
  let rand = randomInteger(1, size.height - gap);

	let move = tweened(size.width, {
		duration: 5000,
		easing: linear
  });

  const unSubscribeGame = game.subscribe(value => {
    console.log('game column',value)

    if (value) {
      // removeColumn()
      runColumn();
    } else {
		  // game.stop();
      // removeColumn();
      // $ move = null
    }
  })

  const unsubscribeMove = move.subscribe(value => {
    // console.log(value, size.width / 10)

    // console.log(value)

    if (value <= (size.width / 10) + 50) {

      if ($gravity <  rand || $gravity + 50 > rand + gap) {
        console.log('gameOver')

        dispatch('gameOver')
        $move = value;
        // return false
      }

      removed = true;
    }

    if (value <= -60) removeColumn();
  })


  function runColumn() {    
    $move = -60;
    if ($move < -60) removeColumn();
  }

  function removeColumn() {

    if (column) {
      column.remove();
      removed = true;
      dispatch('removed');
    }
    
  }

  function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

</script>

<style>
  .column {
    position: absolute;
    width: 60px;
    height: 100%;
    left: 100%;
    top: 0;
    display: flex;
    flex-direction: column;
  }
  .inner {
    background-image: linear-gradient( 90deg, 
      #16501a 0%,
      #1b5e20 60%,
      #2e7d32 60%,
      #2e7d32 70%,
      #388e3c 70%,
      #388e3c 80%,
      #43a047 80%,
      #43a047 90%,
      #4caf50 90% 
    )
  }
  .inner.bottom {
    margin-top: 150px;
  }
  .inner.top {
    flex-grow: 1;
  }
</style>
{$move}

<div 
  style="left: {$move}px;"
  class="column"
  bind:this={column}>
  <div 
    bind:this={top}
    class="inner top"></div>
  <div 
    bind:this={bottom}
    style="height: {rand}px; margin-top: {gap}px"
    class="inner bottom"> </div>

</div>
{#if removed}
  <svelte:self />
{/if}
