import { readable, writable } from 'svelte/store';

const bird = createBird();

function createBird() {
  const { subscribe, set, update } = writable({});
  let position = {}
  let gameOver = false;
  let bound = {};
  
  return {
    subscribe,
    setPosition: (bound) => {
      bound = bound;
      position = {
        bottom: bound.height / 2,
        left: bound.width / 10,
      }
      set(position);
    },
    updatePositionBottom: (n) => {
      position.bottom = n
      set(position);
    },
    gravity: (n) => {
      position.bottom -= n;
      update(position => position)
    },

    start: () => {
      gameOver = false;
      this.setPosition(bound)
    },
    jump: () => {
      if (!gameOver) {
        position.bottom += 100;
        update(position => position)
      }
    },
    die: () => {},
    
    stop: () => {
      gameOver = true;
    },


    getPosition: () => position,
  }
  
}

export default bird;