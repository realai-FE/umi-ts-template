import { useCallback, useEffect, useState } from 'react';
import { debounce } from '@/utils';

function useWindowSize<T>() {
  const isClient: boolean = typeof window === 'object';
  //  interface Config {
  //   currentWidth: T,
  //   currentHeight: T
  //  }
  const getSize = useCallback(() => {
    const config = {
      currentWidth: isClient ? window.innerWidth : 0,
      currentHeight: isClient ? window.innerHeight : 0,
    };
    return config;
  }, [isClient]);

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect((): any => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', debounce(handleResize, 100));
    return () =>
      window.removeEventListener('resize', debounce(handleResize, 100));
  }, [getSize, isClient]);

  return windowSize;
}

export default useWindowSize;
