import { useEffect, useRef } from 'react';

const useTimeout = (
  callback: () => void,
  delay: number,
  deps: unknown[] = []
) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      const id = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }
    return () => {
      // noop
    };
  }, [delay, ...deps]);
};

export default useTimeout;
