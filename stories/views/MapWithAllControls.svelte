<script>
  import Layout from "_stories/views/Layout.svelte";
  import Map from "_src/Map.svelte";
  import AttributionControl from "_src/controls/AttributionControl.svelte";
  import FullscreenControl from "_src/controls/FullscreenControl.svelte";
  import GeolocateControl from "_src/controls/GeolocateControl.svelte";
  import NavigationControl from "_src/controls/NavigationControl.svelte";
  import ScaleControl from "_src/controls/ScaleControl.svelte";
  import { defaultMapProps } from "_stories/config.js";

  export let attribution = true;
  export let fullscreen = true;
  export let geolocate = true;
  export let navigation = true;
  export let scale = true;

  let geolocateRef;
</script>

<Layout>
  <span slot="left">
    <p>
      <label>
        Show attribution control
        <input type="checkbox" bind:checked={attribution} />
      </label>
    </p>
    <p>
      <label>
        Show fullscreen control
        <input type="checkbox" bind:checked={fullscreen} />
      </label>
    </p>
    <p>
      <button on:click={() => geolocateRef.trigger()}>Geolocate</button>
    </p>
    <p>
      <label>
        Show geolocate control
        <input type="checkbox" bind:checked={geolocate} />
      </label>
    </p>
    <p>
      <label>
        Show navigation control
        <input type="checkbox" bind:checked={navigation} />
      </label>
    </p>
    <p>
      <label>
        Show scale control
        <input type="checkbox" bind:checked={scale} />
      </label>
    </p>
  </span>
  <span slot="right">
    <Map {...defaultMapProps} attributionControl={false}>
      {#if fullscreen}
        <FullscreenControl />
      {/if}
      {#if geolocate}
        <GeolocateControl bind:ref={geolocateRef} />
      {/if}
      {#if navigation}
        <NavigationControl />
      {/if}
      {#if scale}
        <ScaleControl />
      {/if}
      {#if attribution}
        <AttributionControl>
          Custom content,
          <b>HTML</b>
          <i>supported</i>
        </AttributionControl>
      {/if}
    </Map>
  </span>
</Layout>
