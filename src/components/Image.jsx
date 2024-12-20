import { useEffect, useState } from "react";

const ImageBlur = ({ src, className, width, height, alt = "" }) => {
  const [currentSrc, setCurrentSrc] = useState(
    `https://placehold.co/${width}x${height}?text=Loading`,
  );

  useEffect(() => {
    const img = new Image();
    if (src) {
      img.src = src;
      img.onload = () => {
        setCurrentSrc(src);
      };

      return;
    }

    setCurrentSrc(`https://placehold.co/${width}x${height}?text=No Image`);

    return () => {
      // clean up function
      img.onload = null;
    };
  }, [src, width, height]);

  return (
    <img
      className={currentSrc === src || !src ? className : `blur ${className}`}
      width={width}
      height={height}
      src={currentSrc}
      alt={alt}
    />
  );
};

export default ImageBlur;
