import { createContext, useState, ReactNode, useContext } from 'react';



type Episode = {
   title: string,
   members: string,
   thumbnail: string,
   duration: number,
   url: string,
}

type PlayerContextData = {
   episodeList: Episode[];
   currentEpisodeIndex: number;
   isPlaying: boolean;
   isLooping: boolean;
   isShuffLing: boolean;
   hasPrevious: boolean;
   hasNext: boolean;
   slideButton: boolean;
   activeSideBarSlideButton: () => void;
   play: (episode: Episode) => void;
   playList: (list: Episode[], index: number) => void;
   tooglePlay: () => void;
   toogleLoop: () => void;
   toogleShuffle: () => void;
   playNext: () => void;
   playPrevious: () => void;
   clearPlayerState: () => void;
   setPlayingState: (state: boolean) => void;
}

export const PlayerContext = createContext({} as PlayerContextData);


type PlayerContextProviderProps = {
   children: ReactNode;
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {


   const [episodeList, setEpisodeList] = useState([]);
   const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
   const [isPlaying, setIsPlaying] = useState(false);
   const [isLooping, setIsLooping] = useState(false);
   const [isShuffLing, setIsShuffLing] = useState(false);

   const [slideButton, setSlideButton] = useState(false);



   function activeSideBarSlideButton () {
      setSlideButton(!slideButton);
   }

   function play(episode: Episode) {
      setEpisodeList([episode]);
      setCurrentEpisodeIndex(0);
      setIsPlaying(true);
   }

   function playList(list: Episode[], index: number) {
      setEpisodeList(list)
      setCurrentEpisodeIndex(index)
      setIsPlaying(true)
   }

   function tooglePlay() {
      setIsPlaying(!isPlaying);
   }

   function toogleLoop() {
      setIsLooping(!isLooping);
   }
   function toogleShuffle() {
      setIsShuffLing(!isShuffLing);
   }

   function setPlayingState(state: boolean) {
      setIsPlaying(state)
   }

   function clearPlayerState() { 
      setEpisodeList([]);
      setCurrentEpisodeIndex(0);
   }

   const hasPrevious = currentEpisodeIndex > 0;
   const hasNext = isShuffLing || (currentEpisodeIndex + 1) < episodeList.length;

   function playPrevious() {
      if (hasPrevious) {
         setCurrentEpisodeIndex(currentEpisodeIndex - 1);
      }
   }

   function playNext() {

      if (isShuffLing) {
         const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
         setCurrentEpisodeIndex(nextRandomEpisodeIndex);

      } else if (hasNext) {
         setCurrentEpisodeIndex(currentEpisodeIndex + 1);
      }
   }

   return (

      <PlayerContext.Provider
         value={{
            episodeList,
            currentEpisodeIndex,
            isPlaying,
            isLooping,
            isShuffLing,
            hasPrevious,
            hasNext,
            slideButton,
            activeSideBarSlideButton,
            playList,
            play,
            tooglePlay,
            toogleLoop,
            toogleShuffle,
            playNext,
            playPrevious,
            setPlayingState,
            clearPlayerState
         }}
      >
         {children}
      </PlayerContext.Provider >

   )

}

export const usePlayer = () => {
   return useContext(PlayerContext);
}


