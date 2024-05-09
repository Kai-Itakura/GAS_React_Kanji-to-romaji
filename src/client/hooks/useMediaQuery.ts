import { useEffect, useState } from 'react';

export const useMediaQuery = () => {
  const tablet = '(width < 960px)';

  const [match, setMatch] = useState(matchMedia(tablet).matches);

  useEffect(() => {
    const mql = matchMedia(tablet);

    if (mql.media === 'not all' || mql.media === 'invalid') {
      console.error(`useMediaQuery Error: Invalid media query`);
    }

    mql.onchange = (e) => {
      setMatch(e.matches);
    };

    return () => {
      mql.onchange = null;
    };
  }, []);

  return match;
};
