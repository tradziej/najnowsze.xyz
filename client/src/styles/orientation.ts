import { css } from '../styled-components';
import { tablet } from './variables';

const orientations = ['portrait', 'landscape'];

interface Orientation {
  landscape: typeof css;
  portrait: typeof css;
}

const orientation: any = {} as Orientation;

orientations.forEach(o => {
  orientation[o] = (...args: any) => {
    const [first, ...rest] = args;
    return css`
      @media only screen and (max-width: ${tablet}px) and (orientation: ${o}) {
        ${css(first, ...rest)};
      }
    `;
  };
});

export default orientation as Orientation;
