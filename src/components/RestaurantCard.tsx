import React from 'react';

import {SafeAreaView, ScrollView, Text, StatusBar, Image} from 'react-native';
import styled from 'styled-components/native';
import Restaurant from '@assets/icons/restaurant.svg';

const RestaurantCard = ({category, name, id, grade, imageUrl}) => {
  return (
    <Container>
      <Info>
        <Category>{category}</Category>
        <Spacer />
        <Name>{name}</Name>
        <Spacer />
        <GradeItem>
          <Restaurant height={18} />
          <Grade>{grade}/5.0점</Grade>
        </GradeItem>
      </Info>
      <ImageView source={{uri: imageUrl}} />
    </Container>
  );
};

export default RestaurantCard;

const Container = styled.View`
  padding: 0 26px;
  height: 96px;
  flex-direction: row;
  justify-content: space-between;
`;

const GradeItem = styled.View`
  flex-direction: row;
`;

const Info = styled.View`
  flex-direction: column;
`;

const Category = styled.Text`
  font-weight: 600;
  font-size: 14px;
  color: #8d8d8d;
  line-height: 22px;
`;

const Name = styled.Text`
  font-weight: 700;
  color: #2d2d2d;
  font-size: 20px;
  line-height: 22px;
`;

const Grade = styled.Text`
  font-weight: 500;
  font-size: 16px;
  color: #3dab55;
  margin-left: 5px;
  line-height: 18px;
`;

const Spacer = styled.View`
  height: 7px;
`;

const ImageView = styled(Image)`
  width: 96px;
  height: 96px;
`;
