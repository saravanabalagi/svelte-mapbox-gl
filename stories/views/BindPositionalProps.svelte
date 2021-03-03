<script>
  import Layout from "_stories/views/Layout.svelte";
  import Map from "_src/Map.svelte";
  import { defaultMapProps } from "_stories/config.js";

  let bearing;
  let center = { lng: 3.7792968750030695, lat: 48.935777757603375 };
  let pitch;
  let zoom = 4;
</script>

<Layout>
  <span slot="left">
    <pre>{JSON.stringify({ bearing, center, pitch, zoom }, null, 2)}</pre>
  </span>
  <span slot="right">
    <Map {...defaultMapProps} bind:bearing bind:center bind:pitch bind:zoom />
  </span>
</Layout>
