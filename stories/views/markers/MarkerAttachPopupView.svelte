<script>
  import Map from "_src/Map.svelte";
  import Marker from "_src/Marker.svelte";
  import Popup from "_src/Popup.svelte";
  import { defaultMapProps } from "_stories/config.js";

  const coordinates = { lat: 48, lng: 3 };
</script>

<Map {...defaultMapProps} center={coordinates} zoom={10}>
  <Marker {coordinates} {...$$restProps}>
    <Popup>
      I'm a popup attached to a marker!
      <br />
      I don't need coordinates because I reuse the marker ones.
      <br />
      <br />
      Small detail: the mouse cursor is set to "pointer".
    </Popup>
  </Marker>

</Map>
