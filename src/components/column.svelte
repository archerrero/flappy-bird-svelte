<script>
	import { beforeUpdate, onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { column, bound, bird, game } from '../store';

  import { tweened } from 'svelte/motion';
  import { linear } from 'svelte/easing';

  let _column;
  let top;
  let bottom;

  let rand = random(1, bound.height - gap)
  let gap = 200;

  const motion = tweened(bound.width, {
    duration: 2000,
	  easing: linear
  })

  onMount(() => {
    $motion = -100;
  });
    
  const motionSubscribe = motion.subscribe(value => {

    if(value < $bird.left + 50 && value > $bird.left) {
      if ($bird.bottom < rand || $bird.bottom + 50 > rand + gap) {
        game.end();
        $motion = value
      }
    } 
  })

  function random(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

</script>

<div 
  bind:this={_column}
  style="left: {$motion}px;"
  class="column">

  <div 
    class="inner top"></div>

  <div 
    bind:this={bottom}
    style="height: {rand}px; margin-top: {gap}px"
    class="inner bottom"> 
    </div>
</div>

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
    position: relative;
    background-image: linear-gradient( 90deg, 
      #01579b 0%,
      #0277bd 60%,
      #0288d1 60%,
      #0288d1 70%,
      #039be5 70%,
      #039be5 80%,
      #03a9f4 80%,
      #03a9f4 90%,
      #29b6f6 90% 
    )
  }

  .inner::after {
    content: "";
    position: absolute;
    left: -16px;
    right: -16px;
    height: 28px;
    background-image: linear-gradient( 90deg, 
      #01579b 0%,
      #0277bd 60%,
      #0288d1 60%,
      #0288d1 70%,
      #039be5 70%,
      #039be5 80%,
      #03a9f4 80%,
      #03a9f4 90%,
      #29b6f6 90% 
    )
  }
  .inner.bottom {
    margin-top: 150px;
  }
  .inner.bottom::after {
    top: 0;
  }
  .inner.top::after {
    bottom: 0;
  }
  .inner.top {
    flex-grow: 1;
  }
</style>