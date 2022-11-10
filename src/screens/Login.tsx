import RestaurantCard from '@/components/RestaurantCard';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  View,
  Image,
} from 'react-native';
import styled from 'styled-components/native';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';

import AppLogo from '@assets/appLogo.svg';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  useEffect(() => {
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('dark-content');
    AsyncStorage.getItem('refresh').then(token => {
      if (token) {
        navigation.navigate('Main');
      }
    });
  }, []);

  const login = async () => {
    if (id === '' || password === '') {
      setError('아이디와 비밀번호를 입력해주세요.');
    } else {
      axios
        .post('http://152.70.255.76:3000/auth/login', {
          user_id: id,
          user_pw: password,
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            setError('');
            AsyncStorage.setItem('refresh', res.data.refreshToken).then(() => {
              axios
                .get('http://152.70.255.76:3000/auth/refresh', {
                  headers: {
                    Cookie: `refreshToken=${res.data.refreshToken};`,
                  },
                  withCredentials: true,
                })
                .then(res => {
                  console.log(res);
                  AsyncStorage.setItem('access', res.data.accessToken).then(
                    () => {
                      navigation.navigate('Main');
                    },
                  );
                });
            });
          } else {
            setError('아이디와 비밀번호를 확인해주세요.');
          }
        })
        .catch(error => {
          console.log(error);
          setError('아이디와 비밀번호를 확인해주세요.');
        });
    }
  };

  return (
    <AppContainer>
      <LoginContainer>
        <TopContainer>
          <Logo source={require('../assets/logo.png')} />
          <Spacer3 />
          <Title>우리동네 식당 예약 앱</Title>
        </TopContainer>
        <Spacer2 />
        <LoginInput
          placeholder="아이디를 입력해주세요"
          onChangeText={text => setId(text)}
          value={id}
          placeholderTextColor="#BBBBBB"
        />
        <Spacer />
        <LoginInput
          placeholder="비밀번호를 입력해주세요"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={isShowPassword ? false : true}
          placeholderTextColor="#BBBBBB"
        />
        <Spacer5 />
        {error.length > 0 && (
          <>
            <Error>{error}</Error>
            <Spacer5 />
          </>
        )}

        <LoginAction>
          <CheckContainer>
            <CheckButton
              disabled={false}
              value={isShowPassword}
              onValueChange={() => setIsShowPassword(!isShowPassword)}
              tintColor={'#3dab70'}
              onFillColor={'#3dab70'}
              onCheckColor={'#ffffff'}
              onTintColor={'#3dab70'}
              boxType={'square'}
              tintColors={{true: '#3dab70', false: '#3dab70'}}
            />

            <CheckText2>비밀번호 보기</CheckText2>
          </CheckContainer>
          <TextButton>계정을 잃어버렸어요</TextButton>
        </LoginAction>
        <Spacer4 />
        <LoginButton onPress={login}>
          <LoginText>로그인</LoginText>
        </LoginButton>
        <Spacer6 />
        <CheckContainer>
          <CheckText>Yeshow에 처음이신가요?</CheckText>
          <RowSpacer />
          <TextButton>회원가입</TextButton>
        </CheckContainer>
      </LoginContainer>
    </AppContainer>
  );
};

const Error = styled.Text`
  font-size: 16px;
  color: #ff0000;
  text-align: left;
  width: 100%;
`;

const CheckContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CheckButton = styled(CheckBox)`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  margin-right: 10px;
`;

const CheckText = styled.Text`
  font-size: 16px;
  color: #2d2d2d;
  font-weight: 500;
`;

const CheckText2 = styled.Text`
  font-size: 16px;
  color: #2d2d2d;
  font-weight: 500;
  margin-right: 5px;
`;

const TextButton = styled.Text`
  font-size: 16px;
  color: #3dab70;
  font-weight: 600;
`;

const RowSpacer = styled.View`
  width: 10px;
`;

const RowSpacer2 = styled.View`
  width: 5px;
`;

const LoginAction = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const Logo = styled(Image)`
  width: 110px;
  height: 30px;
`;

const LoginInput = styled(TextInput)`
  width: 100%;
  height: 60px;
  background-color: #f8f8f8;
  padding: 0 22px;
  font-size: 19px;
  border-radius: 7px;
  color: #2d2d2d;
`;

const TopContainer = styled.View`
  width: 100%;
  display: flex;
  align-items: flex-start;
`;

const Title = styled.Text`
  color: #2d2d2d;
  font-size: 22px;
  font-weight: 500;
`;

const LoginContainer = styled.View`
  padding: 0 26px;
  width: 100%;
  display: flex;
`;

const AppContainer = styled(SafeAreaView)`
  flex: 1;
  height: 100%;
  background-color: white;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const LoginText = styled.Text`
  font-size: 19px;
  color: white;
  text-align: center;
  font-weight: 600;
`;

const CategoryText2 = styled.Text`
  font-size: 16px;
  color: white;
  text-align: center;
  font-weight: 500;
`;

const CategoryContainer = styled.View`
  padding: 0 26px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const CategoryButton2 = styled(TouchableOpacity)`
  width: 76px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #8d8d8d;
  border: 1px solid #f2f2f2;
  border-radius: 20px;
`;

const LoginButton = styled(TouchableOpacity)`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 16px;
  color: white;
  background-color: #3dab70;
  width: 100%;
  border-radius: 7px;
`;

const Typo1 = styled.Text`
  font-size: 22px;
  font-weight: 600;
  color: #2d2d2d;
  padding: 0 26px;
`;

const Typo2 = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #8d8d8d;
  padding: 0 26px;
  line-height: 22px;
`;

const Spacer = styled.View`
  height: 16px;
`;

const Spacer2 = styled.View`
  height: 38px;
`;

const Spacer3 = styled.View`
  height: 20px;
`;

const Spacer4 = styled.View`
  height: 32px;
`;

const Spacer5 = styled.View`
  height: 20px;
`;

const Spacer6 = styled.View`
  height: 30px;
`;

const AnnounceText = styled.Text`
  font-weight: 500;
  font-size: 15px;
  color: skyblue;
  margin-left: 10px;
`;

const AnnounceCard = styled.View`
  padding: 16px 18px;
  background-color: blue;
  border-radius: 20px;
  margin: 20px 24px 0 20px;
  flex-direction: row;
  align-items: center;
`;

export default Login;
