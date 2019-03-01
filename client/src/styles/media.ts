import { css } from '../styled-components';
import { tablet, desktop, big } from './variables';
const sizes = { tablet, desktop, big };

interface Media {
  tablet: typeof css;
  desktop: typeof css;
  big: typeof css;
}

const media: any = {} as Media;

Object.entries(sizes).forEach(([key, value]) => {
  media[key] = (...args: any[]) => {
    const [first, ...rest] = args;
    return css`
      @media only screen and (min-width: ${value}px) {
        ${css(first, ...rest)}
      }
    `;
  };
});

export default media as Media;
