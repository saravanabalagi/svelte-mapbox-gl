<script>
  import Map from "_src/Map.svelte";
  import GeoJSONSource from "_src/sources/GeoJSONSource.svelte";
  import Layer from "_src/Layer.svelte";
  import Layout from "_stories/views/Layout.svelte";
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
</script>

<Layout>
  <span slot="left">
    <label>
      text-offset
      <input
        type="range"
        min={-2}
        max={2}
        step={0.01}
        bind:value={myGeoJSONLayout['text-offset'][1]} />
      <br />
      <code>{myGeoJSONLayout['text-offset'][1]}</code>
    </label>
  </span>
  <span slot="right">
    <Map {...defaultMapProps} center={{ lng: -106, lat: 39.4 }} zoom={2}>
      <GeoJSONSource id="myGeoJSON" data={myGeoJSON}>
        <Layer type="symbol" layout={myGeoJSONLayout} />
      </GeoJSONSource>
    </Map>
  </span>
</Layout>
