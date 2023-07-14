import {QueryClient, QueryClientProvider} from 'react-query';
import {NavigationContainer} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {RecoilRoot, useRecoilState} from 'recoil';
import RootNavigator from "./src/navigation/RootNavigator";
import messaging from "@react-native-firebase/messaging";
import modalState from "./src/store/modal";
const queryClient = new QueryClient();
function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </RecoilRoot>
  );
}


export default App;
