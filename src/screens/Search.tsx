import RestaurantCard from '@/components/RestaurantCard';
import React, {Fragment, useEffect, useState} from 'react';
import Back from '@/assets/icons/back.svg';
import {
  SafeAreaView,
  ScrollView,
  Text,
  StatusBar,
  Pressable,
  View,
  TextInput,
} from 'react-native';
import styled from 'styled-components/native';
import dayString from '../constants/dayString';
import Header from '@/components/header';
import category from '@/constants/category';
import {TouchableOpacity} from 'react-native';
import {API_URI} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const categoryFirst = ['한식', '일식', '중식', '분식'];

const categorySecond = ['치킨', '피자', '양식', '카페'];

const Search = ({navigation}: any) => {
  const [restaurants, setRestaurants] = useState<any>([]);
  const [query, setQuery] = useState<string>('');
  useEffect(() => {
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('dark-content');
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('access').then(value => {
      axios
        .post(
          `${API_URI}restaurant/search`,
          {search: query},
          {
            headers: {
              Authorization: `Bearer ${value}`,
            },
          },
        )
        .then(res => {
          console.log(res.data);
          setRestaurants(res.data);
        });
    });
  }, [query]);

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
        <SearchBar>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Back />
          </TouchableOpacity>

          <SearchInput
            placeholder="식당 이름 검색"
            value={query}
            onChange={e => {
              setQuery(e.nativeEvent.text);
            }}
            placeholderTextColor="#BDBDBD"
          />
        </SearchBar>
        <ScrollView style={{backgroundColor: '#f7f7f7'}}>
          {restaurants.length > 0 &&
            restaurants.map((item: any, index: number) => (
              <Fragment key={index}>
                <Spacer4 />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Restaurant', {
                      id: item.restaurant_uuid,
                    });
                  }}
                  style={{backgroundColor: 'white'}}>
                  <RestaurantCard
                    category={item.restaurant_category}
                    name={item.restaurant_name}
                    id={item.restaurant_uuid}
                    grade={item.restaurant_rating}
                    imageUrl={item.restaurant_image}
                  />
                </TouchableOpacity>
              </Fragment>
            ))}
          {restaurants.length > 0 && <Spacer4 />}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const SearchInput = styled(TextInput)`
  width: 100%;
  height: 60px;
  padding: 0 22px;
  font-size: 19px;
  border-radius: 7px;
  color: #2d2d2d;
`;

const Spacer4 = styled.View`
  height: 27px;
  background-color: white;
`;

const RowSpacer = styled.View`
  width: 5px;
`;

const SearchBar = styled.View`
  height: 56px;
  background-color: white;
  width: 100%;
  align-items: center;
  padding: 0 26px;
  left: 0;
  top: 0;
  margin: 0;
  flex-direction: row;
  justify-content: space-between;
`;

export default Search;
