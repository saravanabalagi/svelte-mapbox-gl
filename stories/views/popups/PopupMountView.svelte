<script>
  import Layout from "_stories/views/Layout.svelte";
  import Map from "_src/Map.svelte";
  import Popup from "_src/Popup.svelte";
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
        <Popup {coordinates}>
          I am placed inside a {'{#if mounted}'} clause.
          <br />
          You can close me, and see the checkbox still being checked.
        </Popup>
      {/if}
    </Map>
  </span>
</Layout>
