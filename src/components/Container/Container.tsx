import React, { useEffect, useRef } from 'react';
import { useWindowSize } from '@/hooks';
interface Config {
  width: number;
  height: number;
}
interface Props {
  config?: Config;
  className: string;
}

const Container: React.FC<Props> = (props) => {
  const { config = { width: 1920, height: 1080 }, children, className } = props;
  const { currentWidth, currentHeight } = useWindowSize<number | undefined>();
  const container = useRef<any>();
  useEffect(() => {
    const absScale: number =
      currentWidth / config.width > currentHeight / config.height
        ? currentHeight / config.height
        : currentWidth / config.width;
    container.current.style.transform = `scale(${absScale})`;
  }, [currentWidth, currentHeight]);
  return (
    <div
      ref={container}
      className={className}
      style={{
        width: `${config.width}px`,
        height: `${config.height}px`,
        transformOrigin: `center top`,
      }}
    >
      {children}
    </div>
  );
};

export default Container;
