import { useEffect, useRef } from 'react';
import Mousetrap from 'mousetrap';

const nullSafeCallback = (callback: (() => void | boolean) | null) => {
  return callback != null
    ? callback
    : () => {
        // noop
      };
};

/**
 * Binds the callback to the defined keystrokes (see mousetrap.js)
 *
 * @param keystrokes the keystrokes which will trigger the callback. See mousetrap library docs for further information
 * @param callback Callback which might return false to prevent default behaviour
 */
const useKeyboardShortcut = (
  keystrokes: string | string[],
  callback: (() => void | boolean) | null,
  options: {
    action?: 'keydown' | 'keyup' | 'keypress';
    elementRef?: React.RefObject<HTMLElement | null>;
  } = {}
) => {
  const savedCallback = useRef(nullSafeCallback(callback));

  useEffect(() => {
    savedCallback.current = nullSafeCallback(callback);
  }, [callback]);

  useEffect(() => {
    const { elementRef, action } = options;
    const mousetrap =
      elementRef?.current != null ? Mousetrap(elementRef.current) : Mousetrap;

    mousetrap.bind(keystrokes, savedCallback.current, action);

    return () => {
      mousetrap.unbind(keystrokes);
    };
  }, [keystrokes]);
};

export default useKeyboardShortcut;
