import GeoJSONClusterView from './views/sources/GeoJSONClusterView.svelte';
import GeoJSONFilterView from './views/sources/GeoJSONFilterView.svelte';
import GeoJSONSourceMountView from './views/sources/GeoJSONSourceMountView.svelte';
import GeoJSONSourceUpdateData from './views/sources/GeoJSONSourceUpdateData.svelte';
import GeoJSONSourceUpdateLayout from './views/sources/GeoJSONSourceUpdateLayout.svelte';
import GeoJSONSourceVisibilityView from './views/sources/GeoJSONSourceVisibilityView.svelte';
import GeoJSONSourceWithSymbolLayerView from './views/sources/GeoJSONSourceWithSymbolLayerView.svelte';
import VectorSourceWithCircleLayerView from './views/sources/VectorSourceWithCircleLayerView.svelte';

export default {
  title: 'Sources',
};

export const geoJSONSourceWithSymbolLayer = () => ({ Component: GeoJSONSourceWithSymbolLayerView });

export const geoJSONSourceMount = () => ({ Component: GeoJSONSourceMountView });

export const geoJSONSourceVisibility = () => ({ Component: GeoJSONSourceVisibilityView });

export const geoJSONSourceUpdateLayout = () => ({ Component: GeoJSONSourceUpdateLayout });

export const geoJSONSourceUpdateData = () => ({ Component: GeoJSONSourceUpdateData });

export const vectorSourceWithCircleLayer = () => ({ Component: VectorSourceWithCircleLayerView });

export const cluster = () => ({ Component: GeoJSONClusterView });

export const filter = () => ({ Component: GeoJSONFilterView });
