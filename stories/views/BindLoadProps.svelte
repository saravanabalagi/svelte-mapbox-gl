<script>
  import Layout from "_stories/views/Layout.svelte";
  import Map from "_src/Map.svelte";
  import { defaultMapProps } from "_stories/config.js";

  let loaded;
  let styleLoaded;
</script>

<Layout>
  <span slot="left">
    <pre>{JSON.stringify({ loaded, styleLoaded }, null, 2)}</pre>
  </span>
  <span slot="right">
    <Map {...defaultMapProps} bind:loaded bind:styleLoaded />
  </span>
</Layout>
