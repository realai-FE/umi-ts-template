import { useState, useEffect, useRef } from 'react';
import isEqual from 'lodash/isEqual';
interface ResConfig {
  field: string;
  callback?: (data: any) => void;
  [x: string]: any;
}

function useFetchInterval(
  service: (...args: any[]) => Promise<any>,
  wait?: number,
  resConfig?: ResConfig,
): any {
  const preDataRef = useRef<any>();
  const timerRef = useRef<any>(null);
  const [resData, setResData] = useState([]);
  useEffect(() => {
    const fetch = (...args: any[]) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      service(...args)
        .then((data) => {
          if (data) {
            if (isEqual(preDataRef.current, data)) {
              return;
            } else {
              preDataRef.current = data;
              setResData(data);
              resConfig && resConfig.callback && resConfig.callback(data);
            }
            preDataRef.current = data;
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          if (wait) {
            timerRef.current = setTimeout(() => {
              fetch(...args);
            }, wait);
          }
        });
    };
    fetch();
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [service]);
  return resData;
}

export default useFetchInterval;
