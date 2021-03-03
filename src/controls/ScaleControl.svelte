<script>
  export let maxWidth = undefined;
  export let position = undefined;
  export let unit = undefined;

  import { ScaleControl } from "mapbox-gl";
  import { getContext, onDestroy } from "svelte";
  import { mapKey } from "../context.js";
  import { omitUndefinedValues } from "../utils.js";

  const mapContext = getContext(mapKey);
  const map = mapContext.getMap();

  const options = omitUndefinedValues({ maxWidth, unit });
  const scaleControl = new ScaleControl(options);
  map.addControl(scaleControl, position);

  $: scaleControl.setUnit(unit);

  onDestroy(() => {
    map.removeControl(scaleControl);
  });
</script>
