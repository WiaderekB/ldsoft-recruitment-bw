import React, {createContext, ReactNode, useContext, useState} from 'react';

type LikedCharactersContextType = {
  likedCharacters: Set<string>;
  toggleLike: (id: string) => void;
  isLiked: (id: string) => boolean;
};

const LikedCharactersContext = createContext<
  LikedCharactersContextType | undefined
>(undefined);

export const LikedCharactersProvider = ({children}: {children: ReactNode}) => {
  const [likedCharacters, setLikedCharacters] = useState<Set<string>>(
    new Set(),
  );

  const toggleLike = (id: string) => {
    setLikedCharacters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const isLiked = (id: string) => likedCharacters.has(id);

  return (
    <LikedCharactersContext.Provider
      value={{likedCharacters, toggleLike, isLiked}}>
      {children}
    </LikedCharactersContext.Provider>
  );
};

export const useLikedCharacters = () => {
  const context = useContext(LikedCharactersContext);
  if (!context) {
    throw new Error(
      'useLikedCharacters must be used within a LikedCharactersProvider',
    );
  }
  return context;
};
