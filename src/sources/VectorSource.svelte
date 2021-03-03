<script>
  // Cf https://docs.mapbox.com/mapbox-gl-js/style-spec/sources/#vector

  export let attribution = undefined;
  export let bounds = undefined;
  export let id;
  export let maxzoom = undefined;
  export let minzoom = undefined;
  export let promoteId = undefined;
  export let scheme = undefined;
  export let tiles = undefined;
  export let url = undefined;

  import {
    createEventDispatcher,
    getContext,
    setContext,
    onDestroy,
  } from "svelte";
  import { mapKey, sourceKey } from "../context.js";
  import { omitUndefinedValues } from "../utils.js";

  const dispatch = createEventDispatcher();

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
      bounds,
      maxzoom,
      minzoom,
      promoteId,
      scheme,
      tiles,
      type: "vector",
      url
    });
    map.addSource(id, options);
    dispatch("add", id);
  }

  function handleStyledata() {
    if (!map.getSource(id)) {
      addSource();
    }
  }

  $: if ($loadedStore) {
    const source = map.getSource(id);
    if (!source) {
      // Add the source before "styledata" event occurs to make it available to child <Layer>.
      addSource();

      // Listen to "styledata" event to re-create the source if the style changes.
      map.on("styledata", handleStyledata);
    }
  }

  onDestroy(() => {
    map.off("styledata", handleStyledata);

    // Remove all <Layer> children of <VectorSource>.
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
