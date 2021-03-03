<script>
  import Map from "_src/Map.svelte";
  import Popup from "_src/Popup.svelte";
  import { defaultMapProps } from "_stories/config.js";

  const coordinates = { lat: 48, lng: 3 };

  export let content = "Hi I'm a popup!";
</script>

<Map {...defaultMapProps} center={coordinates} zoom={10}>
  <Popup {coordinates} {...$$restProps}>
    {@html content}
  </Popup>
</Map>
