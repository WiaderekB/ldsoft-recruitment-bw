import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';

import {LikedCharactersProvider} from './src/services/LikedCharactersContext';
import {MainStack} from './src/stacks/Main';
const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <LikedCharactersProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </QueryClientProvider>
    </LikedCharactersProvider>
  );
}

export default App;
