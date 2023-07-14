import ShopCard from '@components/ShopCard';
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
    TouchableOpacity
} from 'react-native';
import styled from 'styled-components/native';
import dayString from '../constants/dayString';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const categoryFirst = ['한식', '일식', '중식', '분식'];

const categorySecond = ['치킨', '피자', '양식', '카페'];

const Search = ({navigation}: any) => {
  const [shops, setShops] = useState<any>([]);
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
          `${process.env.API_URI}shop/search`,
          {search: query},
          {
            headers: {
              Authorization: `Bearer ${value}`,
            },
          },
        )
        .then(res => {
          console.log(res.data);
          setShops(res.data);
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
          {shops.length > 0 &&
            shops.map((item: any, index: number) => (
              <Fragment key={index}>
                <Spacer4 />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Shop', {
                      id: item.shop_uuid,
                    });
                  }}
                  style={{backgroundColor: 'white'}}>
                  <ShopCard
                    category={item.shop_category}
                    name={item.shop_name}
                    id={item.shop_uuid}
                    grade={item.shop_rating}
                    imageUrl={item.shop_image}
                  />
                </TouchableOpacity>
              </Fragment>
            ))}
          {shops.length > 0 && <Spacer4 />}
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
