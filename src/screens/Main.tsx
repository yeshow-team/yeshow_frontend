import RestaurantCard from '@/components/RestaurantCard';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StatusBar,
  Pressable,
} from 'react-native';
import styled from 'styled-components/native';
import dayString from '../constants/dayString';
import Header from '@/components/header';
import category from '@/constants/category';
import {TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URI} from '@env';

const categoryFirst = ['한식', '일식', '중식', '분식'];

const categorySecond = ['치킨', '피자', '양식', '카페'];

const Main = ({navigation}: any) => {
  const [category, setCategory] = useState<string>('한식');
  const [restaurants, setRestaurants] = useState<any>([]);
  useEffect(() => {
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('dark-content');
    AsyncStorage.getItem('access').then(value => {
      axios
        .get(`${API_URI}restaurant`, {
          headers: {
            Authorization: `Bearer ${value}`,
          },
        })
        .then(res => {
          setRestaurants(res.data);
        });
    });
  }, []);
  const date: Date = new Date();
  const day: string = dayString[date.getDay()];
  return (
    <>
      <SafeAreaView
        style={{
          flex: 0,
          backgroundColor: 'white',
          paddingTop: StatusBar.currentHeight,
        }}
      />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <Header />
        <ScrollView style={{backgroundColor: '#ffffff'}}>
          <Spacer />
          <Typo1>우리 동네 인기 식당 TOP 3</Typo1>
          <Spacer2 />
          <Typo2>
            뭘 먹을지 모르겠다고요?{'\n'}지금 가장 핫한 식당을 살펴보세요!
          </Typo2>
          <Spacer3 />
          <RestaurantCard category="한식" name="통닭" id="1" grade="4.5" />
          <Spacer4 />
          <RestaurantCard category="한식" name="통닭" id="1" grade="4.5" />
          <Spacer4 />
          <RestaurantCard category="한식" name="통닭" id="1" grade="4.5" />
          <Spacer />
          <Typo1>우리 동네 식당</Typo1>
          <Spacer2 />
          <Typo2>
            내 주변에 이런곳도 있었어? {'\n'}내 주변 식당을 찾아보아요 ~
          </Typo2>
          <Spacer5 />
          <CategoryContainer>
            {categoryFirst.map((item, index) =>
              category === item ? (
                <CategoryButton
                  key={index}
                  onPress={() => {
                    setCategory(item);
                  }}>
                  <CategoryText2>{item}</CategoryText2>
                </CategoryButton>
              ) : (
                <CategoryButton2
                  key={index}
                  onPress={() => {
                    setCategory(item);
                  }}>
                  <CategoryText>{item}</CategoryText>
                </CategoryButton2>
              ),
            )}
          </CategoryContainer>
          <Spacer2 />
          <CategoryContainer>
            {categorySecond.map((item, index) =>
              category === item ? (
                <CategoryButton
                  key={index}
                  onPress={() => {
                    setCategory(item);
                  }}>
                  <CategoryText2>{item}</CategoryText2>
                </CategoryButton>
              ) : (
                <CategoryButton2
                  key={index}
                  onPress={() => {
                    setCategory(item);
                  }}>
                  <CategoryText>{item}</CategoryText>
                </CategoryButton2>
              ),
            )}
          </CategoryContainer>

          <Spacer />
          {restaurants.map(
            (item: any, index: number) =>
              category === item.restaurant_category && (
                <>
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate('Restaurant', {
                        id: item.id,
                      });
                    }}>
                    <RestaurantCard
                      category={item.restaurant_category}
                      name={item.restaurant_name}
                      id={item.restaurant_uuid}
                      grade={item.restaurant_rating}
                      imageUrl={item.restaurant_image}
                    />
                  </TouchableOpacity>
                  <Spacer4 />
                </>
              ),
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const CategoryText = styled.Text`
  font-size: 16px;
  color: #8d8d8d;
  text-align: center;
  font-weight: 500;
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

const CategoryButton = styled(TouchableOpacity)`
  width: 76px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 16px;
  color: white;
  background-color: #3dab70;
  border-radius: 20px;
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
  height: 40px;
`;

const Spacer2 = styled.View`
  height: 10px;
`;

const Spacer3 = styled.View`
  height: 34px;
`;

const Spacer4 = styled.View`
  height: 27px;
`;

const Spacer5 = styled.View`
  height: 20px;
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

export default Main;
