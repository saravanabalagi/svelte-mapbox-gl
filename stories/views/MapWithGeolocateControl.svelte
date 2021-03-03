<script>
  import Map from "_src/Map.svelte";
  import GeolocateControl from "_src/controls/GeolocateControl.svelte";
  import { defaultMapProps } from "_stories/config.js";
</script>

<Map {...defaultMapProps}>
  <GeolocateControl />
</Map>
