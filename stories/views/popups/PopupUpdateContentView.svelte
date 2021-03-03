<script>
  import Layout from "_stories/views/Layout.svelte";
  import Map from "_src/Map.svelte";
  import Popup from "_src/Popup.svelte";
  import { defaultMapProps } from "_stories/config.js";

  const coordinates = { lat: 48, lng: 3 };

  let content =
    "My content is bound to a Svelte property!\n<br>\nYou can try to <i>edit it</i>.";
</script>

<Layout>
  <span slot="left">
    <label>
      popup content
      <br />
      <textarea rows={10} bind:value={content} />
    </label>
  </span>
  <span slot="right">
    <Map {...defaultMapProps} center={coordinates} zoom={10}>
      <Popup {coordinates}>
        {@html content}
      </Popup>
    </Map>
  </span>
</Layout>
