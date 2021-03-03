<script>
  import Layout from "_stories/views/Layout.svelte";
  import Map from "_src/Map.svelte";
  import Popup from "_src/Popup.svelte";
  import { defaultMapProps } from "_stories/config.js";

  const coordinates = { lat: 48, lng: 3 };

  let open;
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
      <Popup {coordinates} bind:open>
        My open status is bound to a Svelte property!
        <br />
        You can uncheck the checkbox, and see me being closed.
        <br />
        Or you can close me, and see the checkbox being unchecked.
      </Popup>
    </Map>
  </span>
</Layout>
