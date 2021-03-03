<script>
  export let coordinates;

  import { Marker } from "mapbox-gl";
  import { onDestroy, getContext, setContext } from "svelte";
  import { mapKey, markerKey } from "./context.js";

  setContext(markerKey, {
    getMarker: () => marker
  });

  const mapContext = getContext(mapKey);
  const map = mapContext.getMap();

  const marker = new Marker().setLngLat(coordinates).addTo(map);

  $: marker.setLngLat(coordinates);

  onDestroy(() => {
    marker.remove();
  });
</script>

<slot />
