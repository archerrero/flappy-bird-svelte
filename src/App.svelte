<script>
	import { onMount } from 'svelte';
	import Bird from './components/bird';
	import { gravity } from './store';
	
	let size = document.body.getBoundingClientRect();
	
		console.log(size)


	gravity.set(size.height / 2);
	// gravity.run();
</script>


<Bird 
	sizes={size}/>