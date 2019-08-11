import { writable } from 'svelte/store';

const bird = createBird();

function createBird() {
  const { subscribe, set, update } = writable({});
  let position = {};
  let _interval;
  
  return {
    subscribe,
    setPosition: (bound) => {
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
			let coefficient = .1;
      let initSpeed = Math.PI;
      
      _interval = setInterval(() => {
				bird.gravity(initSpeed);
				initSpeed += coefficient
			}, 10);     
    },
    jump: () => {
      bird.stop();
      position.bottom += 100;
      update(position => position)
      bird.start();
    },
    stop: () => {
			clearInterval(_interval);
    },
    getPosition: () => position,
  }
}

export default bird;