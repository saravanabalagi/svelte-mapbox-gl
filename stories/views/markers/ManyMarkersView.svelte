<script>
  import Map from "_src/Map.svelte";
  import Marker from "_src/Marker.svelte";
  import Popup from "_src/Popup.svelte";
  import Layout from "_stories/views/Layout.svelte";
  import { defaultMapProps } from "_stories/config.js";
  import { randomPosition } from "@turf/random";

  export let generatedCount = 100;

  function generate() {
    let features = [];
    for (let i = 0; i < generatedCount; i++) {
      features.push({
        id: `${i}`,
        title: `Feature ${i}`,
        coordinates: randomPosition([100, 45, 110, 55])
      });
    }
    return features;
  }

  let features = generate();
  let open = {};

  function deleteFeature(id) {
    features = features.filter(feature => feature.id !== id);
  }

  function deleteHalfFeatures() {
    features = _.sampleSize(features, features.length / 2);
  }

  function openFeature(id) {
    open[id] = true;
  }

  function closeFeature(id) {
    open[id] = false;
  }
</script>

<style>
  .mb-6 {
    margin-bottom: 1.5rem;
  }
</style>

<Layout>
  <span slot="left">
    <button
      on:click={() => {
        features = generate();
      }}>
      Generate {generatedCount} features
    </button>
    <button on:click={() => deleteHalfFeatures()}>Delete half features</button>
    <hr />
    <ul>
      {#each features as { title, coordinates, id } (id)}
        <li class="mb-6">
          {title}
          <pre>{JSON.stringify({ coordinates }, null, 2)}</pre>
          {#if open[id]}
            <button on:click={() => closeFeature(id)}>Close</button>
          {:else}
            <button on:click={() => openFeature(id)}>Open</button>
          {/if}
          <button on:click={() => deleteFeature(id)}>Delete</button>
        </li>
      {/each}
    </ul>
  </span>
  <span slot="right">
    <Map {...defaultMapProps} center={{ lat: 50, lng: 105 }} zoom={4}>
      {#each features as { title, coordinates, id } (id)}
        <Marker {coordinates}>
          <Popup bind:open={open[id]}>{title}</Popup>
        </Marker>
      {/each}
    </Map>
  </span>
</Layout>
