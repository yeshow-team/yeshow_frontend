import RestaurantCard from '@/components/RestaurantCard';
import React, {useEffect, useState} from 'react';
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

const categoryFirst = ['한식', '일식', '중식', '분식'];

const categorySecond = ['치킨', '피자', '양식', '카페'];

const Search = ({navigation}: any) => {
  const [category, setCategory] = useState<string>('한식');
  useEffect(() => {
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('dark-content');
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
        <SearchBar>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Back />
          </TouchableOpacity>

          <SearchInput placeholder="식당 이름 검색" />
        </SearchBar>
        <ScrollView style={{backgroundColor: '#f7f7f7'}}></ScrollView>
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
