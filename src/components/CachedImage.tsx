import React, { useEffect, useState } from 'react';

interface CachedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  cacheKey?: string;
  maxCacheSize?: number;
}

const MAX_CACHE_SIZE = 1024 * 1024;

const CachedImage: React.FC<CachedImageProps> = ({ src, cacheKey, maxCacheSize = MAX_CACHE_SIZE, ...props }) => {
  const [imgSrc, setImgSrc] = useState<string>(src);

  useEffect(() => {
    let isMounted = true;
    const key = cacheKey || `cached-img:${src}`;
    const cached = localStorage.getItem(key);
    if (cached) {
      setImgSrc(cached);
      return;
    }
    fetch(src)
      .then(res => res.blob())
      .then(blob => {
        if (!isMounted) return;
        if (blob.size > maxCacheSize) {
          setImgSrc(src);
          return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
          if (!isMounted) return;
          const base64 = reader.result as string;
          try {
            localStorage.setItem(key, base64);
          } catch {
            // localStorage quota exceeded or other error
          }
          setImgSrc(base64);
        };
        reader.readAsDataURL(blob);
      })
      .catch(() => {
        if (isMounted) setImgSrc(src);
      });
    return () => { isMounted = false; };
  }, [src, cacheKey, maxCacheSize]);

  return <img {...props} src={imgSrc} />;
};

export default CachedImage; 