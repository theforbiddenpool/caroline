import { RefObject, useEffect, useRef } from 'react';

function useOnClickOutside(
  ref: RefObject<HTMLElement>,
  callback: (e: MouseEvent | TouchEvent) => void,
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as HTMLElement)) {
        return;
      }

      callbackRef.current(e);
    };

    document.addEventListener('click', listener);

    return () => {
      document.removeEventListener('click', listener);
    };
  }, [ref]);
}

export default useOnClickOutside;
