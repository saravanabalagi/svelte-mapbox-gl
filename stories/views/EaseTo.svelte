<script>
  import Layout from "_stories/views/Layout.svelte";
  import Map from "_src/Map.svelte";
  import { defaultMapProps } from "_stories/config.js";

  let map;

  function easeTo() {
    map.easeTo({
      center: { lng: 3.7792968750030695, lat: 48.935777757603375 },
      zoom: 6
    });
  }
</script>

<Layout>
  <span slot="left">
    <button on:click={() => easeTo()}>Ease to</button>
  </span>
  <span slot="right">
    <Map {...defaultMapProps} bind:map />
  </span>
</Layout>
