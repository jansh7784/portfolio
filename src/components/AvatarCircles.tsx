import { useEffect, useState } from 'react';

interface Avatar {
  imageUrl: string;
  profileUrl: string;
}
interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: Avatar[];
}

export const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  const [maxAvatars, setMaxAvatars] = useState(avatarUrls.length);

  useEffect(() => {
    const checkScreen = () => {
      if (window.innerWidth < 768) {
        setMaxAvatars(6);
      } else {
        setMaxAvatars(avatarUrls.length);
      }
    };
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, [avatarUrls.length]);

  return (
    <div className={`flex -space-x-4 ${className || ""}`}>
      {avatarUrls.slice(0, maxAvatars).map((url, index) => (
        <a
          key={index}
          href={url.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="h-8 md:h-10 w-8 md:w-10 rounded-full border-2 border-black bg-white"
            src={url.imageUrl}
            width={40}
            height={40}
            alt={`Technology skill icon ${index + 1}`}
            title={`Technology skill icon ${index + 1}`}
          />
        </a>
      ))}
      {(numPeople ?? 0) > 0 && (
        <div
          className="flex h-8 md:h-10 w-8 md:w-10 items-center justify-center rounded-full border-2 border-black bg-white text-center text-xs font-medium text-black"
        >
          +{numPeople}
        </div>
      )}
    </div>
  );
};
