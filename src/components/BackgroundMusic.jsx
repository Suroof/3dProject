  import React, { useEffect, useRef } from 'react';

  const BackgroundMusic = ({ src }) => {
    const audioRef = useRef(null);

    useEffect(() => {
      const audio = audioRef.current;
      if (audio) {
        audio.play().catch(error => {
          console.log('Auto-play was prevented:', error);
        });
      }

      return () => {
        if (audio) {
          audio.pause();
          audio.currentTime = 0;
        }
      };
    }, []);

    return (
      <audio
        ref={audioRef}
        src={src}
        loop
        style={{ display: 'none' }}
      />
    );
  };

  export default BackgroundMusic;