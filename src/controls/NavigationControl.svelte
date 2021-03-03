<script>
  export let position = undefined;
  export let showCompass = undefined;
  export let showZoom = undefined;
  export let visualizePitch = undefined;

  import { NavigationControl } from "mapbox-gl";
  import { getContext, onDestroy } from "svelte";
  import { mapKey } from "../context.js";
  import { omitUndefinedValues } from "../utils.js";

  const mapContext = getContext(mapKey);
  const map = mapContext.getMap();

  const options = omitUndefinedValues({
    showCompass,
    showZoom,
    visualizePitch
  });
  const navigationControl = new NavigationControl(options);
  map.addControl(navigationControl, position);

  onDestroy(() => {
    map.removeControl(navigationControl);
  });
</script>
