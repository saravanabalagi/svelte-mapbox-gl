# svelte-mapbox-gl

Svelte 3 components for Mapbox GL.

This work is built on top of [Jailbreak's Gitlab Repo](https://gitlab.com/jailbreak/svelte-mapbox-gl). This fork will add bug fixes and further add functionality useful for working with maps. It is notable that deck.gl Mapbox Layer integration is fully possible.

[Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js) is a JavaScript library that uses WebGL to render interactive maps from vector tiles and Mapbox styles.

[Svelte](https://svelte.dev/) is a JavaScript compiler used to build user interfaces similar to React or Vue, but lighter because components are compiled.

The provided components follow Svelte idioms as much as possible (declarative props, etc.), while keeping the same namings used by Mapbox GL JS (for objects, options and events).

## Usage

See Storybook: https://jailbreak.gitlab.io/svelte-mapbox-gl

Basic usage:

```javascript
<script>
  import {
    Map,
    Marker,
    NavigationControl,
    Popup
  } from "svelte-mapbox-gl";
  const coordinates = { lat: 48, lng: 3 };
</script>

<Map
  accessToken="xxx"
  style="mapbox://styles/mapbox/streets-v11"
  center={coordinates}
  zoom={10}>
  <NavigationControl />
  <Marker {coordinates}>
    <Popup>I'm a popup attached to a marker!</Popup>
  </Marker>
</Map>
```

### Mapbox GL Javascript and CSS

This package defines [mapbox-gl](https://www.npmjs.com/package/mapbox-gl) as a peer dependency.
It needs it, but it's the responsibility of the application using it to provide the `mapbox-gl` module.

About JavaScript two scenarios are possible:

- source Mapbox GL script in the DOM via a `<script src="">` tag targeting the CDN URL, and configure your module bundler (e.g. [Rollup](https://rollupjs.org/), [Webpack](https://webpack.js.org/), etc.) to consider the `mapbox-gl` module as external (see below).
- install the `mapbox-gl` from npm in your application

About CSS two scenarios are possible:

- source Mapbox GL stylesheet in the DOM via a `<link>` tag targeting the CDN URL
- import `mapbox-gl/dist/mapbox-gl.css` from your JavaScript code and setup your module bundler to manage CSS

See also: https://docs.mapbox.com/mapbox-gl-js/overview/

If you choose to include the script via a `<script>` DOM element, you must configure your module bundler to let it "redirect" the `mapbox-gl` module to the global variable `window.mapboxgl` which is provided by the sourced `<script>`. For example, see [Webpack externals](https://webpack.js.org/configuration/externals/) or [Rollup globals + externals](https://rollupjs.org/guide/en/#outputglobals).

### Access token

To avoid hard-coding your `accessToken`, you may load it from your environment (e.g. with [dotenv](https://www.npmjs.com/package/dotenv)). The Storybook uses the access token of all Mapbox GL JS demos (e.g. [Display a map](https://docs.mapbox.com/mapbox-gl-js/example/simple-map/)).

## Documentation

TODO

Meanwhile, read the source code and look at the [Storybook](https://jailbreak.gitlab.io/svelte-mapbox-gl) to know about components, their properies and events.

## Similar projects

- https://github.com/beyonk-adventures/svelte-mapbox
- https://soal.github.io/vue-mapbox/
- http://alex3165.github.io/react-mapbox-gl/
- https://uber.github.io/react-map-gl/
