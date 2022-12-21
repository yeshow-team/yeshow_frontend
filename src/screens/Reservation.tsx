import styled from 'styled-components/native';
import {SafeAreaView, StatusBar, TouchableOpacity, Text} from 'react-native';
import Back from '@assets/icons/back_2.svg';
import {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URI} from '@env';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
const Reservation = ({route, navigation}: any) => {
  const [step, setStep] = useState<number>(1);
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [people, setPeople] = useState<number>(1);

  const [shop, setShop] = useState<any>();
  const [menu, setMenu] = useState<any>([]);
  const [selectedMenu, setSelectedMenu] = useState<any>([]);
  const [reservationDate, setReservationDate] = useState('');
  const [timeVisible, setTimeVisible] = useState<boolean>(false);
  useEffect(() => {
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('dark-content');

    AsyncStorage.getItem('access').then(token => {
      axios
        .get(`${API_URI}shop/menu/${route.params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          console.log(res.data);
          setMenu(res.data);
        });
    });
  }, []);

  const reservation = () => {
    AsyncStorage.getItem('access')
      .then(token => {
        axios.post(
          `${API_URI}book`,
          {
            book: {
              shop_uuid: route.params.id,
              book_date: date,
              book_people: people,
              book_price: 13000,
            },
            book_menu: [
              {
                menu_uuid: 9,
                menu_count: 1,
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <>
      <AppContainer>
        <QuestionContainer>
          <TouchableOpacity
            onPress={() => {
              if (step === 1) {
                navigation.goBack();
              } else if (step === 2) {
                setStep(1);
              } else {
                setStep(2);
              }
            }}>
            <Back />
          </TouchableOpacity>

          <Spacer />
          <Question>
            {step === 1
              ? `언제 방문하실\n예정인가요?`
              : step === 2
              ? `방문 인원 수는\n총 몇명인가요?`
              : `메뉴를\n선택해주세요`}
          </Question>
          <Spacer2 />
          {step === 1 ? (
            <>
              <TouchableOpacity onPress={() => setTimeVisible(true)}>
                <ActionText>시간 선택하기</ActionText>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={timeVisible}
                mode="time"
                onConfirm={date => {
                  setDate(date.toString());
                  console.log(date);
                  setTimeVisible(false);
                }}
                onCancel={() => {
                  setTimeVisible(false);
                }}
              />
            </>
          ) : step === 2 ? (
            <NumberInput
              value={people.toString()}
              onChangeText={text => setPeople(parseInt(text))}
              keyboardType="numeric"
            />
          ) : (
            menu.map((item: any) => {
              return (
                <TouchableOpacity>
                  <Text>{item.shop_menu_name}</Text>
                </TouchableOpacity>
              );
            })
          )}
        </QuestionContainer>
      </AppContainer>
      <SafeAreaView style={{backgroundColor: '#3dab70'}}>
        <NextButton
          onPress={() => {
            if (step === 1) {
              setStep(2);
            } else if (step === 2) {
              setStep(3);
            } else {
              // reservation();
              navigation.navigate('ReservationResult');
            }
          }}>
          <NextText>{step === 3 ? '결제하기' : '다음'}</NextText>
        </NextButton>
      </SafeAreaView>
    </>
  );
};

export default Reservation;
const NextText = styled.Text`
  font-size: 19px;
  font-weight: 600;
  color: white;
`;

const NextButton = styled.TouchableOpacity`
  background-color: #3dab70;
  width: 100%;
  height: 60px;
  justify-content: center;
  align-items: center;
`;

const NumberInput = styled.TextInput`
  width: 100%;
  height: 50px;
  font-size: 19px;
  border: 0;
  border-bottom-width: 1px;
  border-bottom-color: #000;
`;

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
