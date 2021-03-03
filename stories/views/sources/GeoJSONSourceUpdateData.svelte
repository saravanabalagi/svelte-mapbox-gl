<script>
  import Map from "_src/Map.svelte";
  import Layout from "_stories/views/Layout.svelte";
  import GeoJSONSource from "_src/sources/GeoJSONSource.svelte";
  import Layer from "_src/Layer.svelte";
  import { defaultMapProps } from "_stories/config.js";
  import { myGeoJSON } from "_stories/data.js";

  const myGeoJSONLayout = {
    // get the icon name from the source's "icon" property
    // concatenate the name to get an icon from the style's sprite sheet
    "icon-image": ["concat", ["get", "icon"], "-15"],
    // get the title name from the source's "title" property
    "text-field": ["get", "title"],
    "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
    "text-offset": [0, 0.6],
    "text-anchor": "top"
  };

  const data = myGeoJSON;
  function swapFeatures() {
    [data.features[0].geometry, data.features[1].geometry] = [
      data.features[1].geometry,
      data.features[0].geometry
    ];
  }
</script>

<Layout>
  <span slot="left">
    <button on:click={() => swapFeatures()}>Swap places</button>
  </span>
  <span slot="right">
    <Map {...defaultMapProps} center={{ lng: -106, lat: 39.4 }} zoom={2}>
      <GeoJSONSource id="places" {data}>
        <Layer type="symbol" layout={myGeoJSONLayout} />
      </GeoJSONSource>
    </Map>
  </span>
</Layout>
