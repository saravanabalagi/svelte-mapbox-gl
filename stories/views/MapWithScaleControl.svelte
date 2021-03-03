<script>
  import Map from "_src/Map.svelte";
  import ScaleControl from "_src/controls/ScaleControl.svelte";
  import { defaultMapProps } from "_stories/config.js";
</script>

<Map {...defaultMapProps}>
  <ScaleControl />
</Map>
