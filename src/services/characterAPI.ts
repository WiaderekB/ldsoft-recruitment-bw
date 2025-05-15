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
  selectedStatus: string,
  selectedSpecies: string,
  page: number = 1,
): Promise<{characters: Character[]; totalPages: number}> => {
  try {
    const queryParams = new URLSearchParams();

    if (query.length > 0) {
      queryParams.append('name', query);
    }

    if (selectedStatus != '') {
      queryParams.append('status', selectedStatus);
    }

    if (selectedSpecies != '') {
      queryParams.append('species', selectedSpecies);
    }

    queryParams.append('page', page.toString());

    const url = `${BASE_URL}/character/?${queryParams.toString()}`;

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
