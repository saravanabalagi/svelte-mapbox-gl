<script>
  import Map from "_src/Map.svelte";
  import SvelteControl from "_src/controls/SvelteControl.svelte";
  import { defaultMapProps } from "_stories/config.js";
</script>

<style>
  .hello-control {
    padding: 1rem;
    color: red;
    font-size: 22pt;
  }
</style>

<Map {...defaultMapProps}>
  <SvelteControl>
    <div class="hello-control">hello, I'm a Svelte component!</div>
  </SvelteControl>
</Map>
