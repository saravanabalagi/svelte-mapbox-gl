<script>
  import Layout from "_stories/views/Layout.svelte";
  import Map from "_src/Map.svelte";
  import { defaultMapProps } from "_stories/config.js";

  const styles = [
    "mapbox://styles/mapbox/streets-v11",
    "mapbox://styles/mapbox/outdoors-v11",
    "mapbox://styles/mapbox/light-v10",
    "mapbox://styles/mapbox/dark-v10",
    "mapbox://styles/mapbox/satellite-v9",
    "mapbox://styles/mapbox/satellite-streets-v11",
    "mapbox://styles/mapbox/navigation-preview-day-v4",
    "mapbox://styles/mapbox/navigation-preview-night-v4",
    "mapbox://styles/mapbox/navigation-guidance-day-v4",
    "mapbox://styles/mapbox/navigation-guidance-night-v4"
  ];
  let style = styles[0];
</script>

<Layout>
  <span slot="left">
    <label>
      style
      <select bind:value={style}>
        {#each styles as style}
          <option value={style}>{style}</option>
        {/each}
      </select>
    </label>
  </span>
  <span slot="right">
    <Map {...defaultMapProps} {style} />
  </span>
</Layout>
