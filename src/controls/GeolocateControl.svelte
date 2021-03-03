<script>
  export let position = undefined;
  export let positionOptions = undefined;
  export let fitBoundsOptions = undefined;
  export let trackUserLocation = undefined;
  export let showAccuracyCircle = undefined;
  export let showUserLocation = undefined;
  export { geolocateControl as ref };

  import { GeolocateControl } from "mapbox-gl";
  import { createEventDispatcher, getContext, onDestroy } from "svelte";
  import { mapKey } from "../context.js";
  import { omitUndefinedValues } from "../utils.js";

  const dispatch = createEventDispatcher();

  const mapContext = getContext(mapKey);
  const map = mapContext.getMap();

  const options = omitUndefinedValues({
    positionOptions,
    fitBoundsOptions,
    trackUserLocation,
    showAccuracyCircle,
    showUserLocation
  });
  const geolocateControl = new GeolocateControl(options);
  map.addControl(geolocateControl, position);

  // Cf https://docs.mapbox.com/mapbox-gl-js/api/#geolocatecontrol.event:error
  const eventNames = [
    "error",
    "outofmaxbounds",
    "trackuserlocationstart",
    "trackuserlocationend",
    "geolocate"
  ];

  const eventHandlers = {};

  for (const eventName of eventNames) {
    const eventHandler = event => {
      dispatch(eventName, event);
    };
    geolocateControl.on(eventName, eventHandler);
    eventHandlers[eventName] = eventHandler;
  }

  onDestroy(() => {
    for (const eventName of eventNames) {
      geolocateControl.off(eventName, eventHandlers[eventName]);
    }
    map.removeControl(geolocateControl);
  });
</script>
