<script>
	import { beforeUpdate, onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { gravity, size, game } from '../store';
  import { tweened } from 'svelte/motion';
  import { linear } from 'svelte/easing';

  // export let game = false;

  // TODO: clear code
  const dispatch = createEventDispatcher();

  let column;


  // console.log(size.width)
  let columnMove = tweened(size.width, {
		duration: 5000,
		easing: linear
  });

  const unSubscribeGame = game.subscribe(value => {
    console.log('game column',value)

    if (value) {
      $columnMove = -column.getBoundingClientRect().width;
    } else {
      columnMove = tweened(size.width, {
        duration: 5000,
        easing: linear
      });
    }
  })

  const unsubscribeMove = columnMove.subscribe(value => {

    console.log('columnMove', value, )

    if (value <= (size.width / 10) + 50) {

    }

    
    // console.log(value, size.width / 10)

    // console.log('unsubscribeMove', value)

    // // return false

    // if (value <= (size.width / 10) + 50) {

    //   if ($gravity <  rand || $gravity + 50 > rand + gap) {
    //     console.log('gameOver')
    //     game.stop();
    //     dispatch('gameOver')
    //     // $move = value;
    //     // return false
    //   }

    //   // removed = true;
    // }

    // if (value <= -60) {
      
    //   column.remove();
    //   createCol = true;
    //   // $move = size.width;
    // }
  })















  let gameOver = false;
  let top;
  let bottom;
  let left;
  let timer;
  
  let removed = false;
  let gap = 200;
  let rand = randomInteger(1, size.height - gap);

  let createCol = false;

	// let move = tweened(size.width, {
	// 	duration: 5000,
	// 	easing: linear
  // });

  // const unSubscribeGame = game.subscribe(value => {
  //   console.log('game column',value)

  //   if (value) {
  //     // removeColumn() 
  //     console.log('123123123')
  //     $move = size.width;
  //     runColumn();
  //   } else {
  //     // $move = 0 ;
	// 	  // game.stop();
  //     // removeColumn();
  //     // $ move = null
  //   }
  //     // column.remove();
  // })

  // const unsubscribeMove = move.subscribe(value => {
  //   // console.log(value, size.width / 10)

  //   console.log('unsubscribeMove', value)

  //   // return false

  //   if (value <= (size.width / 10) + 50) {

  //     if ($gravity <  rand || $gravity + 50 > rand + gap) {
  //       console.log('gameOver')
  //       game.stop();
  //       dispatch('gameOver')
  //       // $move = value;
  //       // return false
  //     }

  //     // removed = true;
  //   }

  //   if (value <= -60) {
      
  //     column.remove();
  //     createCol = true;
  //     // $move = size.width;
  //   }
  // })


  function runColumn() {    
    // $move = -100;
    // if ($move < -60) removeColumn();
  }

  function removeColumn() {

    if (column) {
      column.remove();
      // removed = true;
      // dispatch('removed');
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
{$columnMove}

<div 
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
{/if}
