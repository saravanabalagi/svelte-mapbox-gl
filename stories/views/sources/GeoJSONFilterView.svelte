<script>
  // Adaptation of https://docs.mapbox.com/mapbox-gl-js/example/cluster/

  import Map from "_src/Map.svelte";
  import Popup from "_src/Popup.svelte";
  import GeoJSONSource from "_src/sources/GeoJSONSource.svelte";
  import Layer from "_src/Layer.svelte";
  import Layout from "_stories/views/Layout.svelte";
  import { coordinatesAtClick } from "_src/utils.js";
  import { defaultMapProps } from "_stories/config.js";

  let map;
  let selection;
  let popupOpen;
  let tsunamiInput = null;
  $: tsunamiFilter =
    tsunamiInput === null
      ? null
      : ["==", ["get", "tsunami"], tsunamiInput ? 1 : 0];

  function setCursor(name) {
    map.getCanvas().style.cursor = name;
  }

  function showPopup(event) {
    const { features } = event.detail;
    const point = features[0];

    const coordinates = coordinatesAtClick(
      point.geometry.coordinates,
      event.lngLat
    );
    const mag = point.properties.mag;
    const tsunami = point.properties.tsunami === 1 ? "yes" : "no";

    selection = { coordinates, mag, tsunami };
    popupOpen = true;
  }
</script>

<Layout>
  <span slot="left">
    caused by tsunami?
    <br />
    <label>
      <input type="radio" bind:group={tsunamiInput} value={null} />
      no matter
    </label>
    <br />
    <label>
      <input type="radio" bind:group={tsunamiInput} value={true} />
      yes
    </label>
    <br />
    <label>
      <input type="radio" bind:group={tsunamiInput} value={false} />
      no
    </label>
  </span>
  <span slot="right">
    <Map
      {...defaultMapProps}
      bind:map
      center={[-103.59179687498357, 40.66995747013945]}
      zoom={3}>
      <GeoJSONSource
        id="earthquakes"
        data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson">
        <Layer
          id="points"
          type="circle"
          filter={tsunamiFilter}
          paint={{ 'circle-color': '#11b4da', 'circle-radius': 4, 'circle-stroke-width': 1, 'circle-stroke-color': '#fff' }}
          on:click={event => showPopup(event)}
          on:mouseenter={() => setCursor('pointer')}
          on:mouseleave={() => setCursor('')} />
      </GeoJSONSource>
      {#if selection}
        <Popup bind:open={popupOpen} coordinates={selection.coordinates}>
          magnitude: {selection.mag}
          <br />
          Was there a tsunami? {selection.tsunami}
        </Popup>
      {/if}
    </Map>
  </span>
</Layout>
