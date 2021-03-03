<script>
  import Layout from "_stories/views/Layout.svelte";
  import Map from "_src/Map.svelte";
  import VectorSource from "_src/sources/VectorSource.svelte";
  import Layer from "_src/Layer.svelte";
  import { defaultMapProps } from "_stories/config.js";

  let map;

  function fitBounds() {
    if (!map) {
      return;
    }
    // TODO Use <VectorSource bind:source />
    const source = map.getSource("museums");
    if (!source) {
      return;
    }
    map.fitBounds(source.bounds);
  }
</script>

<Layout>
  <span slot="left">
    <button on:click={() => fitBounds()}>Fit bounds</button>
  </span>
  <span slot="right">
    <Map
      {...defaultMapProps}
      bind:map
      center={{ lng: -72, lat: -13.5 }}
      zoom={12}>
      <VectorSource id="museums" url="mapbox://mapbox.2opop9hr">
        <Layer
          id="museums"
          type="circle"
          paint={{ 'circle-radius': 8, 'circle-color': 'rgba(55,148,179,1)' }}
          sourceLayer="museum-cusco" />
      </VectorSource>
    </Map>
  </span>
</Layout>
