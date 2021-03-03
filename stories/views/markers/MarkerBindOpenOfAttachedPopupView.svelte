<script>
  import Map from "_src/Map.svelte";
  import Marker from "_src/Marker.svelte";
  import Popup from "_src/Popup.svelte";
  import Layout from "_stories/views/Layout.svelte";
  import { defaultMapProps } from "_stories/config.js";

  const coordinates = { lat: 48, lng: 3 };

  let open = true;
</script>

<Layout>
  <span slot="left">
    <label>
      <input type="checkbox" bind:checked={open} />
      open
    </label>
  </span>
  <span slot="right">
    <Map {...defaultMapProps} center={coordinates} zoom={10}>
      <Marker {coordinates} {...$$restProps}>
        <Popup bind:open>
          I'm a popup attached to a marker!
          <br />
          The "open" property of the popup is bound to a Svelte property.
        </Popup>
      </Marker>
    </Map>
  </span>
</Layout>
