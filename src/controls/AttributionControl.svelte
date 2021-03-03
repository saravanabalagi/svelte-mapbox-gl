<script>
  export let compact = undefined;
  export let position = undefined;

  import { AttributionControl } from "mapbox-gl";
  import { getContext, onDestroy } from "svelte";
  import { mapKey } from "../context.js";
  import { omitUndefinedValues } from "../utils.js";

  const mapContext = getContext(mapKey);
  const map = mapContext.getMap();

  let slotRef;

  $: if (slotRef) {
    const customAttribution = slotRef.innerHTML;
    const options = omitUndefinedValues({ compact, customAttribution });
    const attributionControl = new AttributionControl(options);
    map.addControl(attributionControl, position);
    onDestroy(() => {
      map.removeControl(attributionControl);
    });
  }
</script>

<style>
  span {
    display: none;
  }
</style>

<span bind:this={slotRef}>
  <slot />
</span>
