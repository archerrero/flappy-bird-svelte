import { readable, writable } from 'svelte/store';

const column = createBird();

function createBird() {
  const { subscribe, set, update } = writable(0);
  let position = {}
  let bound = {};
    
  return {
    subscribe,
    setPosition: (bound) => {
      bound = bound;
      position = bound.width;
      set(bound.width);
    },
    movement: (n) => {
      update(position => position -= n )
    },
    set: () => {},
    start: () => {},
    jump: () => {},
    die: () => {},    
    stop: () => {},
  }  
}

export default column;