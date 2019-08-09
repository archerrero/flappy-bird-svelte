<script>
	import { beforeUpdate, onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { column, bound, bird, game } from '../store';

  import { tweened } from 'svelte/motion';
  import { linear } from 'svelte/easing';



  // TODO: Do it again
  console.log('new')
  
  let _column;
  let gap = 200;
  let rand = 0
  let createCol = false;
  let _timer;
  let time = 2000;
  let top;
  let bottom;
  let testArr = []

  const motion = tweened(bound.width - 100, {
    duration: time,
	  easing: linear
  })

  const columnSubscribe = column.subscribe(value => {
    // $motion = value;
  })

  beforeUpdate(() => {
    console.log('123')
  })

  onMount(()=> {
    console.error('onMount; rand: ', rand)
    console.log( _column)
    $motion = 0;
  })

  const gameSubscribe = game.subscribe(value => {
    // console.log(value)
    if (value) {

      console.log('_column', createCol, _column)

      if(_column) {
        _column.remove();
        createCol = true 
      }
      
      $motion = -100;
    } else {
      clearInterval(_timer)
      $motion = bound.width;
    }
  })

  const motionSubscribe = motion.subscribe(value => {

// createCol = false;
    if(value < $bird.left + 50 && value > $bird.left) {
      console.log('first if', rand)
      // createCol = true;
      if ($bird.bottom < rand || $bird.bottom + 50 > rand + gap) {
        // console.group();
        // console.warn('secons if;', 'rand: ', rand, '$bird.bottom: ', $bird.bottom, 'rand + gap: ', rand + gap)
        // console.warn('$bird.bottom < rand ', $bird.bottom < rand )
        // console.warn('$bird.bottom + 50 > rand + gap ', $bird.bottom + 50 > rand + gap )
        // console.groupEnd();

        // console.log( _column)
        game.end();
        $motion = value
        // clearInterval(_timer)
        // // $motion = tweened();
      }

    }

    if (value <= -100) _column.remove();
    
  })

  function random(min, max) {
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



  <div 
    style="left: {$motion}px;"
    class="column"
    bind:this={_column}>

    <div 
      bind:this={top}
      class="inner top"></div>

    <div 
      bind:this={bottom}
      style="height: {rand}px; margin-top: {gap}px"
      class="inner bottom"> 
      {rand}
      </div>
  </div>

<!-- <div 
  style="left: {$columnMove}px;"
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
{#if createCol}
  <svelte:self />
{/if} -->
