<script>
import { createEventDispatcher, getContext, onDestroy } from "svelte";
import { mapKey, sourceKey } from "./context.js";
import { omitUndefinedValues } from "./utils.js";

const mapContext = getContext(mapKey);
const map = mapContext.getMap();
const loadedStore = mapContext.getLoadedStore();

const sourceContext = getContext(sourceKey);
const sourceId = (sourceContext) ? sourceContext.getSourceId() : undefined;

export let filter = undefined;
export let id = sourceId;
export let layout = undefined;
export let maxzoom = undefined;
export let metadata = undefined;
export let minzoom = undefined;
export let paint = undefined;
export let sourceLayer = undefined;
export let source = undefined;
export let type;

const dispatch = createEventDispatcher();

// Cf https://docs.mapbox.com/mapbox-gl-js/api/#map#on
const eventNames = [
  "mousedown",
  "mouseup",
  "click",
  "dblclick",
  "mousemove",
  "mouseenter",
  "mouseleave",
  "mouseover",
  "mouseout",
  "contextmenu",
  "touchstart",
  "touchend",
  "touchcancel"
];

function addLayer() {
  const options = omitUndefinedValues({
    id,
    layout,
    filter: filter || undefined, // `null` is not accepted as an option
    maxzoom,
    metadata,
    minzoom,
    paint,
    source: source || sourceId,
    "source-layer": sourceLayer,
    type
  });
  map.addLayer(options);
}

function handleStyledata() {
  // Check that source is defined, because many "styledata" events are triggered,
  // and source is not defined when the first one occurs.
  if (!map.getLayer(id) && sourceId && map.getSource(sourceId)) {
    addLayer();
  }
}

const eventHandlers = {};

$: if ($loadedStore) {
  const layer = map.getLayer(id);
  if (layer) {
    map.setFilter(id, filter);
    map.setLayerZoomRange(id, minzoom || 0, maxzoom || 24);
    for (const [name, value] of Object.entries(layout || {})) {
      map.setLayoutProperty(id, name, value);
    }
    for (const [name, value] of Object.entries(paint || {})) {
      map.setPaintProperty(id, name, value);
    }
  } else {
    addLayer();
    // Listen to "styledata" event to re-create the layer if the style changes.
    map.on("styledata", handleStyledata);

    // Forward events related to this layer.
    for (const eventName of eventNames) {
      const eventHandler = event => {
        dispatch(eventName, event);
      };
      map.on(eventName, id, eventHandler);
      eventHandlers[eventName] = eventHandler;
    }

    if (sourceContext) sourceContext.addChildLayer(id);
  }
}

onDestroy(() => {
  // Unregister events registered by this layer to avoid multiplicating callbacks.
  map.off("styledata", handleStyledata);
  for (const eventName of eventNames) {
    map.off(eventName, id, eventHandlers[eventName]);
  }

  // If <Layer> is child of <Source>, the layer will have been removed by the onDestroy of <Source>.
  // The following statement ensures layer is removed in other cases.
  if (map.getLayer(id)) {
    map.removeLayer(id);
  }
});
</script>
