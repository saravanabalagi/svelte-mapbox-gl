import PopupBindOpenView from "./views/popups/PopupBindOpenView.svelte"
import PopupMountView from "./views/popups/PopupMountView.svelte"
import PopupUpdateContentView from "./views/popups/PopupUpdateContentView.svelte"
import PopupUpdateCoordinatesView from "./views/popups/PopupUpdateCoordinatesView.svelte"
import PopupView from "./views/popups/PopupView.svelte"

export default {
  title: 'Popups',
};

export const basic = () => ({ Component: PopupView });

export const noCloseButton = () => ({
  Component: PopupView,
  props: { closeButton: false }
});

export const noCloseOnClick = () => ({
  Component: PopupView,
  props: { closeOnClick: false }
});

export const htmlContent = () => ({
  Component: PopupView,
  props: { content: "I'm a popup with <b>HTML</b> <i>content</i>!" }
});

export const bindOpen = () => ({ Component: PopupBindOpenView });

export const updateContent = () => ({ Component: PopupUpdateContentView });

export const updateCoordinates = () => ({ Component: PopupUpdateCoordinatesView });

export const mount = () => ({ Component: PopupMountView });
