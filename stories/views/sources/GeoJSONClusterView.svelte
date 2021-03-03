<script>
  // Adaptation of https://docs.mapbox.com/mapbox-gl-js/example/cluster/

  import Map from "_src/Map.svelte";
  import Popup from "_src/Popup.svelte";
  import GeoJSONSource from "_src/sources/GeoJSONSource.svelte";
  import Layer from "_src/Layer.svelte";
  import { coordinatesAtClick } from "_src/utils.js";
  import { defaultMapProps } from "_stories/config.js";

  let map;
  let selection;
  let popupOpen;

  function setCursor(name) {
    map.getCanvas().style.cursor = name;
  }

  function zoomToCluster({ event, sourceId, layerId }) {
    const { point } = event.detail;
    const features = map.queryRenderedFeatures(point, {
      layers: [layerId]
    });
    const clusterId = features[0].properties.cluster_id;
    map
      .getSource(sourceId)
      .getClusterExpansionZoom(clusterId, function(err, zoom) {
        if (err) return;

        map.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom
        });
      });
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

<Map
  {...defaultMapProps}
  bind:map
  center={[-103.59179687498357, 40.66995747013945]}
  zoom={3}>
  <GeoJSONSource
    id="earthquakes"
    data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
    cluster={true}
    clusterMaxZoom={14}
    clusterRadius={50}>
    <Layer
      id="clusters"
      type="circle"
      filter={['has', 'point_count']}
      paint={{ 'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'], 'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40] }}
      on:click={event => zoomToCluster({
          event,
          sourceId: 'earthquakes',
          layerId: 'clusters'
        })}
      on:mouseenter={() => setCursor('pointer')}
      on:mouseleave={() => setCursor('')} />
    <Layer
      id="cluster-count"
      type="symbol"
      filter={['has', 'point_count']}
      layout={{ 'text-field': '{point_count_abbreviated}', 'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'], 'text-size': 12 }} />
    <Layer
      id="unclustered-point"
      type="circle"
      filter={['!', ['has', 'point_count']]}
      paint={{ 'circle-color': '#11b4da', 'circle-radius': 4, 'circle-stroke-width': 1, 'circle-stroke-color': '#fff' }}
      on:click={showPopup}
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
