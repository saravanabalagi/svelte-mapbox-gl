<script>
  import Map from "_src/Map.svelte";
  import Marker from "_src/Marker.svelte";
  import Popup from "_src/Popup.svelte";
  import Layout from "_stories/views/Layout.svelte";
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
      <Marker {coordinates} {...$$restProps}>
        {#if mounted}
          <Popup>
            I'm a popup attached to a marker, placed inside a {'{#if mounted}'}
            clause. !
            <br />
            <br />
            Small detail: the mouse cursor is set to "pointer" when popup is
            mounted, and restored when unmounted.
          </Popup>
        {/if}
      </Marker>
    </Map>
  </span>
</Layout>
