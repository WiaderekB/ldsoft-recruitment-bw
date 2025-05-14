const BASE_URL = 'https://rickandmortyapi.com/api';

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  origin: {
    name: string;
    url: string;
  };
  gender: string;
};

export const getCharacters = async (
  query: string,
  page: number = 1,
): Promise<{characters: Character[]; totalPages: number}> => {
  try {
    const url =
      query.length === 0
        ? `${BASE_URL}/character/?page=${page}`
        : `${BASE_URL}/character/?name=${query}&page=${page}`;

    const response = await fetch(url);
    const data = await response.json();

    return {
      characters: data.results || [],
      totalPages: data.info?.pages || 1,
    };
  } catch (error) {
    console.error('Failed to fetch searched characters:', error);
    return {
      characters: [],
      totalPages: 1,
    };
  }
};
