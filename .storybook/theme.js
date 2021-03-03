import { create } from '@storybook/theming/create';
import packageJson from "../package.json";

export default create({
  base: 'light',

  brandTitle: `${packageJson.name} demos`,
  brandUrl: packageJson.homepage,
});
