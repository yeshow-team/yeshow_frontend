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
import styled from 'styled-components/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URI} from '@env';
import Like from '@assets/icons/like.svg';
import Share from '@assets/icons/share.svg';
import GradeIcon from '@assets/icons/shop.svg';
import Reservation from './Reservation';
import StarFill from '@assets/icons/star_fill.svg';
import Star from '@assets/icons/star.svg';

const Shop = ({route, navigation}: any) => {
  const [shop, setShop] = useState<any>();
  const [menu, setMenu] = useState<any>([]);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [review, setReview] = useState<any>([]);
  useEffect(() => {
    StatusBar.setBackgroundColor('transparent');
    StatusBar.setTranslucent(true);
    StatusBar.setBarStyle('dark-content');

    AsyncStorage.getItem('access').then(token => {
      axios
        .get(`${API_URI}shop/${route.params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(res => {
          console.log(res.data);
          setShop(res.data.shop);
          setMenu(res.data.menu);
          setIsLike(res.data.isLike);
          setReview(res.data.review);
        })
        .catch(err => {
          console.log(err);
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
        {shop && (
          <>
            <Header>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Back />
              </TouchableOpacity>

              <Title>{shop.shop_name}</Title>
              <View style={{width: 24, background: 'none'}}></View>
            </Header>
            <ScrollView style={{backgroundColor: '#ffffff'}}>
              <ImageView
                source={{
                  uri: shop.shop_image,
                }}
              />
              <Container>
                <Spacer />
                <Category>{shop.shop_category}</Category>
                <Spacer2 />
                <ShopTitle>{shop.shop_name}</ShopTitle>
                <Spacer3 />
                <GradeComponent grade={shop.shop_rating} />
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
                      name={item.shop_menu_name}
                      price={item.shop_menu_price}
                      image={item.shop_menu_image}
                      description={item.shop_menu_description}
                    />
                    <Spacer7 />
                  </>
                ))}
                <Row>
                  <SectionTitle>리뷰</SectionTitle>
                  <SectionSpacer />
                  <SectionSubtitle>총 {review.length}개의 리뷰</SectionSubtitle>
                </Row>
                <Spacer6 />
                {review.map((item, index) => (
                  <>
                    <ReviewComponent
                      key={index}
                      title={item.shop_review_title}
                      content={item.shop_review_detail}
                      user={item.user_id}
                      rating={item.shop_review_rating}
                      date={item.shop_review_updated_date}
                    />
                    <Spacer7 />
                  </>
                ))}
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
export default Shop;

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

const ReviewComponent = ({title, content, user, rating, date}) => {
  return (
    <ReviewContainer>
      <UserContainer>
        <UserImage source={{uri: 'https://picsum.photos/200'}} />
        <RatingSpacer />
        <Username>{user.substr(0, 3) + '*'.repeat(user.length - 3)}님</Username>
        <RatingSpacer />
        <ReviewDate>{timeForToday(date)}</ReviewDate>
      </UserContainer>
      <RatingColumnSpacer />
      <RatingContainer>
        {Array.from({length: rating}, (v, i) => (
          <StarFill width={24} height={24} />
        ))}
        {Array.from({length: 5 - rating}, (v, i) => (
          <Star />
        ))}
        <RatingText>{rating}.0/5.0점</RatingText>
      </RatingContainer>
      <RatingColumnSpacer2 />
      <ReviewTitle>{title}</ReviewTitle>
      <ReviewContent>{content}</ReviewContent>
    </ReviewContainer>
  );
};

const timeForToday = value => {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60,
  );
  if (betweenTime < 1) return '방금 전';
  if (betweenTime < 60) {
    return `${betweenTime}분 전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간 전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일 전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년 전`;
};

const RatingColumnSpacer2 = styled.View`
  width: 100%;
  height: 19px;
`;

const RatingColumnSpacer = styled.View`
  height: 12px;
`;

const RatingSpacer = styled.View`
  width: 13px;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const RatingText = styled.Text`
  font-size: 16px;
  color: #3dab70;
  margin-left: 18px;
`;

const ReviewTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-top: 8px;
`;

const ReviewContent = styled.Text`
  font-size: 19px;
  color: #3b3b3b;
  margin-top: 8px;
  line-height: 28px;
`;

const ReviewContainer = styled.View`
  background-color: #ffffff;
`;

const UserContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const UserImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const Username = styled.Text`
  font-size: 19px;
  color: #2d2d2d;
  font-weight: 500;
`;

const ReviewDate = styled.Text`
  color: #8d8d8d;
  font-size: 19px;
`;

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

const ShopTitle = styled.Text`
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
