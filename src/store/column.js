import { readable, writable } from 'svelte/store';

const column = createBird();

function createBird() {
  const { subscribe, set, update } = writable(0);
    
  return {
    subscribe,
    setPosition: (bound) => {
      set(bound.width);
    },
    movement: (n) => {
      update(position => position -= n )
    },
  }  
}

export default column;