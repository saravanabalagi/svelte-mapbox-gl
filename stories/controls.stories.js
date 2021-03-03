import MapWithAllControls from './views/MapWithAllControls.svelte';
import MapWithAttributionControl from './views/MapWithAttributionControl.svelte';
import MapWithFullscreenControl from './views/MapWithFullscreenControl.svelte';
import MapWithGeolocateControl from './views/MapWithGeolocateControl.svelte';
import MapWithNavigationControl from './views/MapWithNavigationControl.svelte';
import MapWithScaleControl from './views/MapWithScaleControl.svelte';
import MapWithSvelteControl from './views/MapWithSvelteControl.svelte';

export default {
  title: 'Controls',
};

export const attribution = () => ({ Component: MapWithAttributionControl });
export const fullscreen = () => ({ Component: MapWithFullscreenControl });
export const geolocate = () => ({ Component: MapWithGeolocateControl });
export const navigation = () => ({ Component: MapWithNavigationControl });
export const scale = () => ({ Component: MapWithScaleControl });
export const all = () => ({ Component: MapWithAllControls });
export const svelte = () => ({ Component: MapWithSvelteControl });
