<script>
  import Map from "_src/Map.svelte";
  import FullscreenControl from "_src/controls/FullscreenControl.svelte";
  import { defaultMapProps } from "_stories/config.js";
</script>

<Map {...defaultMapProps}>
  <FullscreenControl />
</Map>
