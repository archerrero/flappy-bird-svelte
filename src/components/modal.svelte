<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  export let noButtons = false,
             code = null;

  const dispatch = createEventDispatcher();

  let modal;
  let modalSize;
  let width;
  let height;

  onMount(() => {
    modalSize = modal.getBoundingClientRect();
    width = modalSize.width
    height = modalSize.height;
  })

  function onKeypress(e) {
    if(e.code == code) {
      dispatch('agree')
    }
  }

</script>

<style>
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    border: 3px solid rgb(12, 12, 12);
    padding: 16px;
    background-color: #fff;
  }
</style>


<svelte:body
	on:keypress|once="{onKeypress}" />

<div 
  bind:this={modal}
  style="margin-left: -{width / 2}px; margin-top: -{height / 2}px"
  class="modal">

  <slot></slot>

  {#if !noButtons}
    <button></button>
    <button></button>
  {/if}
</div>
