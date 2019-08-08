<script>
  import { gravity } from '../store';

  export let sizes = Object;

  const unSubscribe = gravity.subscribe(c => {
    if (c > sizes.height || c < 0 ) {
      gravity.set(sizes.height / 2);
      gravity.stop();
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
    position: fixed;
    left: 50%;
  }
</style>

<svelte:body
	on:keydown|once="{onKeypress}"
/>

<div 
  style="bottom: {$gravity}px">
  {$gravity}
</div>