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
export const getFavouriteCharacters = async (
  ids: string[],
  query: string,
  selectedStatus: string,
  selectedSpecies: string,
): Promise<{characters: Character[]}> => {
  try {
    if (ids.length === 0) {
      return {
        characters: [],
      };
    }
    const url = `${BASE_URL}/character/${ids.join(',')}`;

    const response = await fetch(url);
    const data = await response.json();

    if (ids.length == 1) var characters: Character[] = [data];
    else var characters: Character[] = data || [];

    if (query.length > 0) {
      characters = characters.filter(character =>
        character.name.toLowerCase().includes(query.toLowerCase()),
      );
    }
    if (selectedStatus != '') {
      characters = characters.filter(
        character =>
          character.status.toLowerCase() === selectedStatus.toLowerCase(),
      );
    }
    if (selectedSpecies != '') {
      characters = characters.filter(
        character =>
          character.species.toLowerCase() === selectedSpecies.toLowerCase(),
      );
    }

    return {
      characters,
    };
  } catch (error) {
    console.error('Failed to fetch searched characters:', error);
    return {
      characters: [],
    };
  }
};
