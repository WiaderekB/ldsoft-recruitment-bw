import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './paginationContainer.styled';

interface PaginationProps {
  handlePageSelect: (page: number) => void;
  totalPages: number;
  currentPage: number;
}

const SearchBar: React.FC<PaginationProps> = ({
  handlePageSelect,
  totalPages,
  currentPage,
}) => {
  const getVisiblePages = () => {
    if (totalPages <= 3) {
      return Array.from({length: totalPages}, (_, i) => i + 1);
    }

    if (currentPage === 1) return [1, 2, 3];
    if (currentPage === totalPages)
      return [totalPages - 2, totalPages - 1, totalPages];
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  return (
    <View style={styles.paginationContainer}>
      {currentPage > 1 && (
        <TouchableOpacity
          onPress={() => handlePageSelect(currentPage - 1)}
          style={styles.arrowButton}>
          <Text style={styles.arrowText}>{'<'}</Text>
        </TouchableOpacity>
      )}

      {getVisiblePages().map(page => (
        <TouchableOpacity
          key={page}
          onPress={() => handlePageSelect(page)}
          style={[
            styles.pageButton,
            currentPage === page && styles.activePageButton,
          ]}>
          <Text
            style={[
              styles.pageText,
              currentPage === page && styles.activePageText,
            ]}>
            {page}
          </Text>
        </TouchableOpacity>
      ))}

      {currentPage < totalPages && (
        <TouchableOpacity
          onPress={() => handlePageSelect(currentPage + 1)}
          style={styles.arrowButton}>
          <Text style={styles.arrowText}>{'>'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
