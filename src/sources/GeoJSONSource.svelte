<script>
  // Cf https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#geojson

  export let attribution = undefined;
  export let buffer = undefined;
  export let cluster = undefined;
  export let clusterMaxZoom = undefined;
  export let clusterProperties = undefined;
  export let clusterRadius = undefined;
  export let data = undefined; // URL or inline data
  export let generateId = undefined;
  export let id;
  export let lineMetrics = undefined;
  export let maxzoom = undefined;
  export let promoteId = undefined;
  export let tolerance = undefined;

  import { getContext, setContext, onDestroy } from "svelte";
  import { mapKey, sourceKey } from "../context.js";
  import { omitUndefinedValues } from "../utils.js";

  const mapContext = getContext(mapKey);
  const map = mapContext.getMap();
  const loadedStore = mapContext.getLoadedStore();

  // Remember ID of all <Layer> children, in order to remove them in onDestroy, before removing the source.
  const layers = [];

  setContext(sourceKey, {
    getSourceId: () => id,
    addChildLayer: id => {
      layers.push(id);
    }
  });

  function addSource() {
    const options = omitUndefinedValues({
      attribution,
      buffer,
      cluster,
      clusterMaxZoom,
      clusterProperties,
      clusterRadius,
      data,
      generateId,
      lineMetrics,
      maxzoom,
      promoteId,
      tolerance,
      type: "geojson"
    });
    map.addSource(id, options);
  }

  function handleStyledata() {
    if (!map.getSource(id)) {
      addSource();
    }
  }

  $: if ($loadedStore) {
    const source = map.getSource(id);
    if (source) {
      source.setData(data);
    } else {
      // Add the source before "styledata" event occurs to make it available to child <Layer>.
      addSource();

      // Listen to "styledata" event to re-create the source if the style changes.
      map.on("styledata", handleStyledata);
    }
  }

  onDestroy(() => {
    map.off("styledata", handleStyledata);

    // Remove all <Layer> children of <GeoJSONSource>.
    let layerId;
    while ((layerId = layers.pop())) {
      if (map.getLayer(layerId)) {
        map.removeLayer(layerId);
      }
    }

    if (map.getSource(id)) {
      map.removeSource(id);
    }
  });
</script>

<slot />
