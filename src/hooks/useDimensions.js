import { useEffect, useState } from 'react';

export const useDimensions = () => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);

  window.addEventListener('resize', () => {
    setInnerHeight(window.innerHeight);
    setInnerWidth(window.innerWidth);
  });

  useEffect(() => {}, [innerHeight, innerWidth]);

  return {
    innerHeight,
    innerWidth,
  };
};
export function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
