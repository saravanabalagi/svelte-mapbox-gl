<script>
  import Map from "_src/Map.svelte";
  import Marker from "_src/Marker.svelte";
  import { defaultMapProps } from "_stories/config.js";

  const coordinates = { lat: 48, lng: 3 };
</script>

<Map {...defaultMapProps} center={coordinates} zoom={10}>
  <Marker {coordinates} {...$$restProps} />
</Map>
