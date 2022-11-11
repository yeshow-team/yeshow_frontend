import styled from 'styled-components/native';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';

import {useEffect} from 'react';

import Complete from '@assets/icons/complete.svg';

const ReservationResult = ({route, navigation}: any) => {
  useEffect(() => {
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('dark-content');
    setTimeout(() => navigation.push('Main'), 1000);
  }, []);
  return (
    <AppContainer>
      <ResultContainer>
        <ResultComponent>
          <View></View>
          <Complete />
          <Spacer />
          <ResultText>예약이 완료되었습니다.</ResultText>
        </ResultComponent>
      </ResultContainer>
    </AppContainer>
  );
};

export default ReservationResult;

const ResultText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #000000;
`;

const Spacer = styled.View`
  height: 20px;
`;

const ResultComponent = styled.View`
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

const ResultContainer = styled.View`
  padding: 16px 26px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const AppContainer = styled(SafeAreaView)`
  flex: 1;
  height: 100%;
  background-color: white;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
