<script>
  export let position = null;

  import { getContext, onMount } from "svelte";
  import { mapKey } from "../context.js";

  const mapContext = getContext(mapKey);
  const map = mapContext.getMap();

  let rootElement;

  onMount(() => {
    const layerSelectorControl = {
      onAdd(map) {
        return rootElement;
      },
      onRemove() {},
    };
    map.addControl(layerSelectorControl, position || undefined);
    return function onDestroy() {
      map.removeControl(layerSelectorControl);
    };
  });
</script>

<div bind:this={rootElement} class="mapboxgl-ctrl mapboxgl-ctrl-group">
  <slot {map} />
</div>
