<script>
  // import important css declarations given by mapbox-gl
  import 'mapbox-gl/dist/mapbox-gl.css';
  import BoxSelect from './BoxSelect.svelte';

  // mapboxgl properties
  export let accessToken;
  export let baseApiUrl = undefined;

  // mapboxgl.Map instance
  export let map = null;

  // mapboxgl.Map properties
  export let antialias = undefined;
  export let attributionControl = undefined;
  export let bearing = undefined;
  export let bearingSnap = undefined;
  export let bounds = undefined;
  export let boxZoom = undefined;
  export let boxSelect = undefined;
  export let center = undefined;
  export let clickTolerance = undefined;
  export let collectResourceTiming = undefined;
  export let crossSourceCollisions = undefined;
  export let customAttribution = undefined;
  export let doubleClickZoom = undefined;
  export let dragPan = undefined;
  export let dragRotate = undefined;
  export let fadeDuration = undefined;
  export let failIfMajorPerformanceCaveat = undefined;
  export let fitBoundsOptions = undefined;
  export let hash = undefined;
  export let interactive = undefined;
  export let keyboard = undefined;
  export let locale = undefined;
  export let localIdeographFontFamily = undefined;
  export let logoPosition = undefined;
  export let maxBounds = undefined;
  export let maxPitch = undefined;
  export let maxTileCacheSize = undefined;
  export let maxZoom = undefined;
  export let minPitch = undefined;
  export let minZoom = undefined;
  export let pitch = undefined;
  export let pitchWithRotate = undefined;
  export let preserveDrawingBuffer = undefined;
  export let refreshExpiredTiles = undefined;
  export let renderWorldCopies = undefined;
  export let scrollZoom = undefined;
  export let style = undefined;
  export let touchZoomRotate = undefined;
  export let trackResize = undefined;
  export let transformRequest = undefined;
  export let zoom = undefined;

  // <Map> Svelte component properties
  export let loaded = false;
  export let styleLoaded = false;

  import mapboxgl, { Map } from 'mapbox-gl';
  import { onMount, createEventDispatcher, setContext } from 'svelte';
  import { writable } from 'svelte/store';
  import { mapKey } from './context.js';
  import { omitUndefinedValues } from './utils.js';

  mapboxgl.accessToken = accessToken;
  if (baseApiUrl) {
    mapboxgl.baseApiUrl = baseApiUrl;
  }

  const loadedStore = writable(false);

  setContext(mapKey, {
    getMap: () => map,
    getLoadedStore: () => loadedStore,
  });

  // expose map and loaded outside
  export const getMap = () => map;
  export const isLoaded = () => loaded;

  const dispatch = createEventDispatcher();

  let container;

  onMount(async () => {
    if (boxSelect) {
      if (boxZoom) {
        const msg = 'Cannot enable both boxZoom and boxSelect. Disabling boxZoom';
        console.warn(msg);
      }
      boxZoom = false;
    }
    const options = omitUndefinedValues({
      antialias,
      attributionControl,
      bearing,
      bounds,
      bearingSnap,
      boxZoom,
      boxSelect,
      center,
      clickTolerance,
      collectResourceTiming,
      container,
      crossSourceCollisions,
      customAttribution,
      doubleClickZoom,
      dragPan,
      dragRotate,
      fadeDuration,
      failIfMajorPerformanceCaveat,
      fitBoundsOptions,
      hash,
      interactive,
      keyboard,
      locale,
      localIdeographFontFamily,
      logoPosition,
      maxBounds,
      maxPitch,
      maxTileCacheSize,
      maxZoom,
      minPitch,
      minZoom,
      pitch,
      pitchWithRotate,
      preserveDrawingBuffer,
      refreshExpiredTiles,
      renderWorldCopies,
      scrollZoom,
      style,
      touchZoomRotate,
      trackResize,
      transformRequest,
      zoom,
    });
    map = new Map(options);

    function updateGeoState() {
      bearing = map.getBearing();
      center = map.getCenter();
      pitch = map.getPitch();
      zoom = map.getZoom();
    }

    // Events
    // Cf https://docs.mapbox.com/mapbox-gl-js/api/#map

    function handleClick(event) {
      dispatch('click', event);
    }

    function handleData(event) {
      styleLoaded = map.isStyleLoaded();
      dispatch('data', event);
    }

    function handleLoad(event) {
      loaded = true;
      $loadedStore = true;
      updateGeoState();
      dispatch('load', event);
    }

    function handleMove(event) {
      updateGeoState();
      dispatch('move', event);
    }

    function handleMoveEnd(event) {
      updateGeoState();
      dispatch('moveend', event);
    }

    const handleBoxSelectStart = (e) => dispatch('boxselectstart', e);
    const handleBoxSelectEnd = (e) => dispatch('boxselectend', e);
    const handleBoxSelectCancel = (e) => dispatch('boxselectcancel', e);

    map.on('click', handleClick);
    map.on('data', handleData);
    map.on('load', handleLoad);
    map.on('move', handleMove);
    map.on('moveend', handleMoveEnd);

    map.on('boxselectstart', handleBoxSelectStart);
    map.on('boxselectend', handleBoxSelectEnd);
    map.on('boxselectcancel', handleBoxSelectCancel);

    // TODO forward all events
    // Cf https://docs.mapbox.com/mapbox-gl-js/api/#map.event:resize

    return () => {
      map.off('click', handleClick);
      map.off('data', handleData);
      map.off('load', handleLoad);
      map.off('move', handleMove);
      map.off('moveend', handleMoveEnd);

      map.off('boxselectstart', handleBoxSelectStart);
      map.off('boxselectend', handleBoxSelectEnd);
      map.off('boxselectcancel', handleBoxSelectCancel);

      map.remove();
    };
  });

  $: if (map) {
    map.setStyle(style);
  }
  </script>

  <div bind:this={container}>
    {#if map}
      {#if boxSelect}
        <BoxSelect />
      {/if}
      <slot />
    {/if}
  </div>

  <style>
  div {
    width: 100%;
    height: 100%;
  }
  </style>
