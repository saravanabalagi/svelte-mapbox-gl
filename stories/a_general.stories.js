import BindLoadProps from "./views/BindLoadProps.svelte"
import BindPositionalProps from "./views/BindPositionalProps.svelte"
import ChangeStyle from "./views/ChangeStyle.svelte"
import EaseTo from "./views/EaseTo.svelte"
import Map from "_src/Map.svelte";
import { defaultMapProps } from "./config.js"

export default {
  title: 'General',
};

export const basic = () => ({
  Component: Map,
  props: defaultMapProps,
});

export const initialCenterAndZoom = () => ({
  Component: Map,
  props: {
    ...defaultMapProps,
    center: { lng: 3.7792968750030695, lat: 48.935777757603375 },
    zoom: 5
  },
});

export const bindPositionalProps = () => ({ Component: BindPositionalProps });

export const bindLoadProps = () => ({ Component: BindLoadProps });

export const changeStyle = () => ({ Component: ChangeStyle });

export const easeTo = () => ({ Component: EaseTo });
