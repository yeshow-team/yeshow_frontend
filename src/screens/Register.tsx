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

const Register = ({route, navigation}: any) => {
  const [step, setStep] = useState<number>(1);
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [tel, setTel] = useState<string>('');

  useEffect(() => {
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('dark-content');
  }, []);
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
              ? `사용하실 아이디를\n입력해주세요`
              : step === 2
              ? `전화번호를\n입력해주세요`
              : `비밀번호를\n입력해주세요`}
          </Question>
          <Spacer2 />
          {step === 1 ? (
            <NumberInput
              value={id}
              onChangeText={text => setId(text)}
              placeholder="아이디 (6-20자, 영문, 숫자 사용 가능)"
            />
          ) : step === 2 ? (
            <NumberInput
              value={tel}
              onChangeText={text => setTel(text)}
              placeholder="전화번호를 입력해주세요"
            />
          ) : (
            <NumberInput
              value={pw}
              onChangeText={text => setPw(text)}
              secureTextEntry={true}
              placeholder="비밀번호를 입력해주세요"
            />
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
              navigation.navigate('RegisterResult');
            }
          }}>
          <NextText>{step === 3 ? '가입하기' : '다음'}</NextText>
        </NextButton>
      </SafeAreaView>
    </>
  );
};

export default Register;

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
  border-bottom-color: #2d2d2d;
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
  line-height: 37px;
`;

const Spacer = styled.View`
  height: 37px;
`;

const Spacer2 = styled.View`
  height: 50px;
`;
