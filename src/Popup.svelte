<script>
  // mapboxgl.Map properties
  export let anchor = undefined;
  export let className = undefined;
  export let closeButton = undefined;
  export let closeOnClick = undefined;
  export let closeOnMove = undefined;
  export let maxWidth = undefined;
  export let offset = undefined;

  // <Popup> Svelte component properties
  export let coordinates = undefined;
  export let open = undefined;

  import { Popup } from "mapbox-gl";
  import { getContext, onDestroy } from "svelte";
  import { mapKey, markerKey } from "./context.js";
  import { omitUndefinedValues } from "./utils.js";

  const mapContext = getContext(mapKey);
  const map = mapContext.getMap();

  let slotRef;

  const options = omitUndefinedValues({
    anchor,
    className,
    closeButton,
    closeOnClick,
    closeOnMove,
    maxWidth,
    offset
  });

  const popup = new Popup(options);

  function handleOpen() {
    open = true;
  }

  function handleClose() {
    open = false;
  }

  popup.on("open", handleOpen);
  popup.on("close", handleClose);

  $: if (slotRef) {
    popup.setDOMContent(slotRef);
  }

  const markerContext = getContext(markerKey);
  if (!markerContext) {
    // <Popup> is child of <Map>
    if (open === undefined) {
      open = true;
    }
  }
  $: if (markerContext) {
    // <Popup> is child of <Marker>
    if (coordinates) {
      throw new Error(
        `<Popup> must not have a 'coordinates' property when used as a child of <Marker>`
      );
    }
    const marker = markerContext.getMarker();
    if (marker) {
      if (marker.getPopup()) {
        if (open !== popup.isOpen()) {
          marker.togglePopup();
        }
      } else {
        marker.setPopup(popup);
        const markerElement = marker.getElement();
        markerElement.style.cursor = "pointer";
        open = popup.isOpen();
      }
    }
  } else {
    // <Popup> is child of <Map>
    if (!coordinates) {
      throw new Error(
        `<Popup> must have a 'coordinates' property when used as a child of <Map>`
      );
    }
    popup.setLngLat(coordinates);
    if (open) {
      popup.addTo(map);
    } else {
      popup.remove();
    }
  }

  onDestroy(() => {
    popup.off("open", handleOpen);
    popup.off("close", handleClose);
    popup.remove();
    if (markerContext) {
      const marker = markerContext.getMarker();
      marker.setPopup(null);
      const markerElement = marker.getElement();
      markerElement.style.cursor = null;
    }
  });
</script>

<span bind:this={slotRef}>
  <slot />
</span>
