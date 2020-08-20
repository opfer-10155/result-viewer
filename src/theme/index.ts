import { createMuiTheme } from '@material-ui/core';
import { Theme as DefaultTheme } from '@material-ui/core/styles';
import palette from './palette';
import typography from './typography';
import overrides from './overrides';

const themeOptions = {
  palette,
  typography,
  overrides,
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
}

export const theme = createMuiTheme(themeOptions);

export type Theme = DefaultTheme & typeof themeOptions

// export interface ITheme extends Theme {

// }

export default theme;
