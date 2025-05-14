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
): Promise<{characters: Character[]}> => {
  try {
    const url =
      query.length === 0
        ? `${BASE_URL}/character/`
        : `${BASE_URL}/character/?name=${query}`;

    const response = await fetch(url);
    const data = await response.json();

    return {
      characters: data.results || [],
    };
  } catch (error) {
    console.error('Failed to fetch searched characters:', error);
    return {
      characters: [],
    };
  }
};
