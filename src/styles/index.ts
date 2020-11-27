import { createStyling } from './StyleHOC';
import Styles from './GlobalStyles';

const { StyleProvider, withStyle, useStyles } = createStyling(Styles);

export { StyleProvider, withStyle, useStyles };
