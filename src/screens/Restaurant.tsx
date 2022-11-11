import styled from 'styled-components/native';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import Back from '@assets/icons/back.svg';
import {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URI} from '@env';
import Like from '@assets/icons/like.svg';
import Share from '@assets/icons/share.svg';
import GradeIcon from '@assets/icons/restaurant.svg';
import Reservation from './Reservation';

const Restaurant = ({route, navigation}: any) => {
  const [restaurant, setRestaurant] = useState<any>();
  const [menu, setMenu] = useState<any>([]);
  const [isLike, setIsLike] = useState<boolean>(false);
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
          setIsLike(res.data.isLike);
          setReview(res.data.review);
        });
    });
  }, []);
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
        {restaurant && (
          <>
            <Header>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Back />
              </TouchableOpacity>

              <Title>{restaurant.restaurant_name}</Title>
              <View style={{width: 24, background: 'none'}}></View>
            </Header>
            <ScrollView style={{backgroundColor: '#ffffff'}}>
              <ImageView
                source={{
                  uri: restaurant.restaurant_image,
                }}
              />
              <Container>
                <Spacer />
                <Category>{restaurant.restaurant_category}</Category>
                <Spacer2 />
                <RestaurantTitle>{restaurant.restaurant_name}</RestaurantTitle>
                <Spacer3 />
                <GradeComponent grade={restaurant.restaurant_rating} />
                <Spacer4 />
                <RowFull>
                  <ActionButton>
                    <Like />
                    <ActionSpacer />
                    <ActionTextDisabled>좋아요</ActionTextDisabled>
                  </ActionButton>
                  <ActionButton>
                    <Share />
                    <ActionSpacer />
                    <ActionText>공유하기</ActionText>
                  </ActionButton>
                </RowFull>
                <Spacer5 />
                <Row>
                  <SectionTitle>메뉴</SectionTitle>
                  <SectionSpacer />
                  <SectionSubtitle>총 {menu.length}개</SectionSubtitle>
                </Row>
                <Spacer6 />
                {menu.map((item, index) => (
                  <>
                    <MenuComponent
                      key={index}
                      name={item.restaurant_menu_name}
                      price={item.restaurant_menu_price}
                      image={item.restaurant_menu_image}
                      description={item.restaurant_menu_description}
                    />
                    <Spacer7 />
                  </>
                ))}
                <Row>
                  <SectionTitle>리뷰</SectionTitle>
                  <SectionSpacer />
                  <SectionSubtitle>총 {review.length}개</SectionSubtitle>
                </Row>
              </Container>
            </ScrollView>
          </>
        )}
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: '#3dab70'}}>
        <ReservationButton
          onPress={() => {
            navigation.navigate('Reservation', {
              id: route.params.id,
            });
          }}>
          <ReservationText>예약하기</ReservationText>
        </ReservationButton>
      </SafeAreaView>
    </>
  );
};
export default Restaurant;

const MenuComponent = ({image, price, name, description}) => {
  return (
    <MenuContainer>
      <MenuContent>
        <ContentTop>
          <MenuName>{name}</MenuName>
          <Spacer8 />
          <MenuDescription>
            {description.substring(0, 13) + '...'}
          </MenuDescription>
        </ContentTop>
        <MenuPrice>
          {price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}원
        </MenuPrice>
      </MenuContent>
      <MenuImage source={{uri: image}} />
    </MenuContainer>
  );
};

const MenuContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #ffffff;
  height: 97px;
`;

const MenuContent = styled.View`
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  align-items: flex-start;
  background: #ffffff;
`;

const ContentTop = styled.View`
  flex-direction: column;
`;

const MenuName = styled.Text`
  font-size: 25px;
  font-weight: 600;
  color: #2d2d2d;
`;

const MenuDescription = styled.Text`
  font-size: 19px;
  color: #8d8d8d;
`;

const MenuPrice = styled.Text`
  font-size: 19px;
  font-weight: 400;
  color: #2d2d2d;
`;

const MenuImage = styled.Image`
  height: 97px;
  width: 100px;
`;

const SectionSpacer = styled.View`
  width: 16px;
`;

const SectionSubtitle = styled.Text`
  font-size: 16px;
  color: #8d8d8d;
  font-weight: 500;
`;

const SectionTitle = styled.Text`
  font-size: 25px;
  font-weight: 600;
  color: #2d2d2d;
`;

const ReservationText = styled.Text`
  font-size: 19px;
  font-weight: 600;
  color: white;
`;

const ReservationButton = styled.TouchableOpacity`
  background-color: #3dab70;
  width: 100%;
  height: 60px;
  justify-content: center;
  align-items: center;
`;

const GradeComponent = ({grade}) => {
  let color;
  if (grade >= 4.0) {
    color = '#3dab55';
  } else if (grade >= 3.0) {
    color = '#FFE600';
  } else {
    color = '#FF2E00';
  }

  return (
    <GradeItem>
      <GradeIcon height={20} style={{color: color}} />
      <RowSpacer />
      <Grade style={{color: color}}>{grade}/5.0점</Grade>
    </GradeItem>
  );
};

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RowFull = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ActionTextDisabled = styled.Text`
  color: #bbbbbb;
  font-size: 19px;
`;

const ActionText = styled.Text`
  color: #2d2d2d;
  font-size: 19px;
`;

const ActionSpacer = styled.View`
  width: 10px;
`;

const ActionButton = styled.TouchableOpacity`
  width: 49%;
  height: 46px;
  border: 1px solid #f2f2f2;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Container = styled.View`
  padding: 0 26px;
  width: 100%;
  display: flex;
`;

const RestaurantTitle = styled.Text`
  font-size: 25px;
  font-weight: 600;
  color: #2d2d2d;
`;

const Grade = styled.Text`
  font-size: 22px;
  font-weight: 500;
`;

const RowSpacer = styled.View`
  width: 15px;
`;

const GradeItem = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Category = styled.Text`
  font-size: 19px;
  font-weight: 600;
  color: #5e5e5e;
`;

const ImageView = styled(Image)`
  width: 100%;
  height: 323px;
`;

const Title = styled.Text`
  font-size: 19px;
  color: #2d2d2d;
  font-weight: 600;
`;

const Spacer = styled.View`
  height: 37px;
`;

const Spacer2 = styled.View`
  height: 10px;
`;

const Spacer3 = styled.View`
  height: 18px;
`;

const Spacer4 = styled.View`
  height: 25px;
`;

const Spacer5 = styled.View`
  height: 48px;
`;

const Spacer6 = styled.View`
  height: 40px;
`;

const Spacer7 = styled.View`
  height: 35px;
`;

const Spacer8 = styled.View`
  height: 8px;
`;

const Header = styled.View`
  height: 56px;
  background-color: white;
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 26px;
  left: 0;
  top: 0;
  margin: 0;
  flex-direction: row;
`;
