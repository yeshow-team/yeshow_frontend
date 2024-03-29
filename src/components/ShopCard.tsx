import React, {useEffect} from 'react';

import {Image} from 'react-native';
import styled from 'styled-components/native';
import Restaurant from '@assets/icons/shop.svg';

const ShopCard = ({category, name, id, grade, imageUrl}) => {
  useEffect(
    () => console.log(`ShopCard ${grade} rendered`),
    [grade],
  )
  return (
    <Container>
      <Info>
        <Category>{category}</Category>
        <Spacer />
        <Name>{name}</Name>
        <Spacer />
        <GradeComponent grade={grade} />
      </Info>
      <ImageView source={{uri: imageUrl}} />
    </Container>
  );
};

const GradeComponent = ({grade}) => {
  let color;
  if (grade >= 4.0) {
    color = '#3dab55';
  } else if (grade >= 3.0) {
    color = '#ffbb00';
  } else {
    color = '#FF2E00';
  }

  return (
    <GradeItem>
      <Restaurant height={16} style={{color: color}} />
      <RowSpacer />
      <Grade style={{color: color}}>{grade.toFixed(1)}/5.0점</Grade>
    </GradeItem>
  );
};

export default ShopCard;

const RowSpacer = styled.View`
  width: 5px;
`;

const Container = styled.View`
  padding: 0 26px;
  height: 96px;
  flex-direction: row;
  justify-content: space-between;
`;

const GradeItem = styled.View`
  flex-direction: row;
  align-items: center;
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
