import {
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
} from "react";
import { isBrowser, noop } from "@/helpers/misc";

type ParserOptions<T> =
  | {
      raw: true;
    }
  | {
      raw: false;
      serializer: (value: T) => string;
      deserializer: (value: string) => T;
    };

export const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
  options?: ParserOptions<T>
): [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void] => {
  if (!isBrowser) {
    return [initialValue as T, noop, noop];
  }

  if (!key) {
    throw new Error("useLocalStorage key may not be falsy");
  }

  const deserializer = options
    ? options.raw
      ? (value: any) => value // eslint-disable-line
      : options.deserializer
    : JSON.parse;

  const initializer = useRef((key: string) => {
    try {
      const serializer = options
        ? options.raw
          ? String
          : options.serializer
        : JSON.stringify;

      const localStorageValue = localStorage.getItem(key);
      if (localStorageValue !== null) {
        return deserializer(localStorageValue);
      } else {
        initialValue && localStorage.setItem(key, serializer(initialValue));
        return initialValue;
      }
    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw. JSON.parse and JSON.stringify can throw, too.
      return initialValue;
    }
  });

  const [state, setState] = useState<T | undefined>(() =>
    initializer.current(key)
  );

  // useLayoutEffect(() => {
  //   setState(initializer.current(key));
  // }, [key]);
  useEffect(() => {
    setState(initializer.current(key));
  }, [key]);

  const set: Dispatch<SetStateAction<T | undefined>> = useCallback(
    (valOrFunc) => {
      try {
        const newState =
          typeof valOrFunc === "function"
            ? (valOrFunc as Function)(state) // eslint-disable-line
            : valOrFunc;
        let value: string;

        if (options)
          if (options.raw)
            if (typeof newState === "string") value = newState;
            else value = JSON.stringify(newState);
          else if (options.serializer) value = options.serializer(newState);
          else value = JSON.stringify(newState);
        else value = JSON.stringify(newState);

        localStorage.setItem(key, value);
        setState(deserializer(value));
      } catch {
        // If user is in private mode or has storage restriction
        // localStorage can throw. Also JSON.stringify can throw.
      }
    },
    [key, setState]
  );

  const remove = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setState(undefined);
    } catch {
      // If user is in private mode or has storage restriction
      // localStorage can throw.
    }
  }, [key, setState]);

  return [state, set, remove];
};
