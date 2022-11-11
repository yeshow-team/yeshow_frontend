import styled from 'styled-components/native';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import Back from '@assets/icons/back_2.svg';
import {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URI} from '@env';
import Like from '@assets/icons/like.svg';
import Share from '@assets/icons/share.svg';
import GradeIcon from '@assets/icons/restaurant.svg';

const Reservation = ({route, navigation}: any) => {
  const [step, setStep] = useState<number>(1);
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [people, setPeople] = useState<number>(1);

  const [restaurant, setRestaurant] = useState<any>();
  const [menu, setMenu] = useState<any>([]);
  const [review, setReview] = useState<any>([]);
  useEffect(() => {
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('dark-content');

    AsyncStorage.getItem('access').then(token => {
      axios
        .get(`${API_URI}restaurant/${route.params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          console.log(res.data);
          setRestaurant(res.data.restaurant);
          setMenu(res.data.menu);
          setReview(res.data.review);
        });
    });
  }, []);
  return (
    <AppContainer>
      <QuestionContainer>
        <Back />
        <Spacer />
        <Question>
          {step === 1
            ? `언제 방문하실\n예정인가요?`
            : step === 2
            ? `언제 방문하실\n예정인가요?`
            : `언제 방문하실${'\n'}
                예정인가요?`}
        </Question>
        <Spacer2 />
        {step === 1 ? (
          <TouchableOpacity>
            <ActionText>시간 선택하기</ActionText>
          </TouchableOpacity>
        ) : step === 2 ? (
          <TouchableOpacity>
            <ActionText>인원수 입력하기</ActionText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <ActionText>메뉴 고르기</ActionText>
          </TouchableOpacity>
        )}
      </QuestionContainer>
    </AppContainer>
  );
};

export default Reservation;

const AppContainer = styled(SafeAreaView)`
  flex: 1;
  height: 100%;
  background-color: white;
  align-items: center;
  width: 100%;
`;

const ActionText = styled.Text`
  font-size: 19px;
  color: #3dab70;
  font-weight: 600;
`;

const QuestionContainer = styled.View`
  display: flex;
  padding: 57px 26px 0 26px;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

const Question = styled.Text`
  font-size: 25px;
  font-weight: 600;
  color: #2d2d2d;
  line-height: 26px;
`;

const Spacer = styled.View`
  height: 37px;
`;

const Spacer2 = styled.View`
  height: 50px;
`;
