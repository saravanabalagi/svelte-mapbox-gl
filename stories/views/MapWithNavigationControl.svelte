<script>
  import Map from "_src/Map.svelte";
  import NavigationControl from "_src/controls/NavigationControl.svelte";
  import { defaultMapProps } from "_stories/config.js";
</script>

<Map {...defaultMapProps}>
  <NavigationControl />
</Map>
