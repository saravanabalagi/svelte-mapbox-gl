<script>
  export let container = undefined;
  export let position = undefined;

  import { FullscreenControl } from "mapbox-gl";
  import { getContext, onDestroy } from "svelte";
  import { mapKey } from "../context.js";
  import { omitUndefinedValues } from "../utils.js";

  const mapContext = getContext(mapKey);
  const map = mapContext.getMap();

  const options = omitUndefinedValues({ container });
  const fullscreenControl = new FullscreenControl(options);
  map.addControl(fullscreenControl, position);

  onDestroy(() => {
    map.removeControl(fullscreenControl);
  });
</script>
