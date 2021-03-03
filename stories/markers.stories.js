import ManyMarkersView from "./views/markers/ManyMarkersView.svelte"
import MarkerAttachPopupView from "./views/markers/MarkerAttachPopupView.svelte"
import MarkerBindOpenOfAttachedPopupView from "./views/markers/MarkerBindOpenOfAttachedPopupView.svelte"
import MarkerMountAttachedPopupView from "./views/markers/MarkerMountAttachedPopupView.svelte"
import MarkerMountView from "./views/markers/MarkerMountView.svelte"
import MarkerUpdateCoordinatesView from "./views/markers/MarkerUpdateCoordinatesView.svelte"
import MarkerView from "./views/markers/MarkerView.svelte"

export default {
  title: 'Markers',
};

export const basic = () => ({ Component: MarkerView });

export const updateCoordinates = () => ({ Component: MarkerUpdateCoordinatesView });

export const mount = () => ({ Component: MarkerMountView });

export const attachPopup = () => ({ Component: MarkerAttachPopupView });

export const mountAttachedPopup = () => ({ Component: MarkerMountAttachedPopupView });

export const bindOpenOfAttachedPopup = () => ({ Component: MarkerBindOpenOfAttachedPopupView });

export const manyMarkers = () => ({ Component: ManyMarkersView });
