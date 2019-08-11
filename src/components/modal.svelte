<script>
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  export let text,
             agreeText,
             disagreeText;

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

  function onAgree() {
    dispatch('agree')
  }

  function onDisagree() {
    dispatch('disagree')
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

  .modal--buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  button {
    cursor: pointer;
    border: 3px solid rgb(12, 12, 12);
  }

  button + button {
    margin-left: 16px;
  }
</style>

<div 
  bind:this={modal}
  style="margin-left: -{width / 2}px; margin-top: -{height / 2}px"
  class="modal">

  <p>{text}</p>

  <div class="modal--buttons">
    
    {#if agreeText}
      <button
        on:click={onAgree}>
        {agreeText}
      </button>
    {/if}

    {#if disagreeText}
      <button
        on:click={onDisagree}>
        {disagreeText}
      </button>
    {/if}
  </div>

</div>
