import { useEffect, useState } from "react";

const ImageBlur = ({ src, className, width, height, alt = "" }) => {
  const [currentSrc, setCurrentSrc] = useState(
    `https://placehold.co/${width}x${height}?text=Loading`,
  );

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
    };

    return () => {
      // clean up function
      img.onload = null;
    };
  }, [src]);

  return (
    <img
      className={currentSrc === src ? className : `blur ${className}`}
      width={width}
      height={height}
      src={currentSrc}
      alt={alt}
    />
  );
};

export default ImageBlur;
