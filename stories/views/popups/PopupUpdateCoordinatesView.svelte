<script>
  import Layout from "_stories/views/Layout.svelte";
  import Map from "_src/Map.svelte";
  import Popup from "_src/Popup.svelte";
  import { defaultMapProps } from "_stories/config.js";

  const coordinates = { lat: 48, lng: 3 };
</script>

<Layout>
  <span slot="left">
    <p>
      <label>
        latitude
        <br />
        <input type="range" bind:value={coordinates.lat} min={-90} max={90} />
      </label>
      {coordinates.lat}
    </p>
    <p>
      <label>
        longitude
        <br />
        <input type="range" bind:value={coordinates.lng} min={-180} max={180} />
      </label>
      {coordinates.lng}
    </p>
  </span>
  <span slot="right">
    <Map {...defaultMapProps} center={coordinates} zoom={0}>
      <Popup {coordinates}>
        My coordinates are bound to a Svelte property!
      </Popup>
    </Map>
  </span>
</Layout>
