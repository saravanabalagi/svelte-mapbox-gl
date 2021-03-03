<script>
  import Map from "_src/Map.svelte";
  import AttributionControl from "_src/controls/AttributionControl.svelte";
  import { defaultMapProps } from "_stories/config.js";
</script>

<Map {...defaultMapProps} attributionControl={false}>
  <AttributionControl>
    Custom content,
    <b>HTML</b>
    <i>supported</i>
  </AttributionControl>
</Map>
