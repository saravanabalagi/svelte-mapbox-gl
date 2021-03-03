<script>
  import Layout from "_stories/views/Layout.svelte";
  import Map from "_src/Map.svelte";
  import Marker from "_src/Marker.svelte";
  import { defaultMapProps } from "_stories/config.js";

  const coordinates = { lat: 48, lng: 3 };

  let mounted = true;
</script>

<Layout>
  <span slot="left">
    <label>
      <input type="checkbox" bind:checked={mounted} />
      mounted
    </label>
  </span>
  <span slot="right">
    <Map {...defaultMapProps} center={coordinates} zoom={10}>
      {#if mounted}
        <Marker {coordinates} {...$$restProps} />
      {/if}
    </Map>
  </span>
</Layout>
