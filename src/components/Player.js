import React, { useState, useEffect } from "react";
// import Sound from 'react-sound'
import HansZimmerCornfieldChase from '../audios/HansZimmerCornfieldChase.mp3'

// const url='https://soundcloud.com/bridgeyb14/high-level-paulistos-ft-mo-escape-my-mind-bridgey-b-remix?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing';

// const useAudio = (url) => {
//     const [audio] = useState(new Audio(url));
//     const [playing, setPlaying] = useState(false);

//   const toggle = () => setPlaying(!playing);

//   useEffect(() => {
//       playing ? audio.play() : audio.pause();
//     },
//   );

//   useEffect(() => {
//     audio.addEventListener('ended', () => setPlaying(false));
//     return () => {
//       audio.removeEventListener('ended', () => setPlaying(false));
//     };
//   },);

//   return [playing, toggle];
// };

// const Player = ({ url }) => {
//   const [playing, toggle] = useAudio(url);

//   return (
//     <div>
//       <button onClick={toggle}>{playing ? "Pause" : "Play"}</button>
//     </div>
//   );
// };


const Player = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggle = () => setIsPlaying(!isPlaying)

  return (
    <div>
      <button onClick={toggle}> {isPlaying ? 'Pause' : 'Play'}</button>
      <Sound
        url={HansZimmerCornfieldChase}
        playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED
        }
      />
    </div>
  )
}

export default Player;