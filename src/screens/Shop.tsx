import {
  Image, Platform,
  SafeAreaView,
  ScrollView,
  StatusBar, Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Back from '@assets/icons/back.svg';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import Like from '@assets/icons/like.svg';
import Share from '@assets/icons/share.svg';
import GradeIcon from '@assets/icons/shop.svg';
import Review from "@components/Review";
import Menu from "@components/Menu";
import {getMenu, getReview, getShop} from "@/lib/api/shop";
import {useMutation, useQuery, useQueryClient} from "react-query";
import review from "@components/Review";
import {postReview} from "@/lib/api/review";
import CreateReview from "@components/CreateReview";

type ReviewDataType = {
  shop_review_title: string
  shop_review_detail: string
  shop_uuid: string
  shop_review_rating: number
  shop_review_updated_date:string
  date: string
  user_id: string
  user_image: string
  myReview: boolean
  user_name: string
}

interface MenuType {
  menu_id: number;
  shop_uuid: string;
  shop_menu_name: string;
  shop_menu_description: string;
  shop_menu_price: number;
  shop_menu_image: string;
  shop_menu_type: number;
}

const Shop = ({route, navigation}: any) => {

  const {data:shop} = useQuery(['shop'],() => getShop(route.params.id), {
    enabled: !!route.params.id,
    suspense: true,
  });
  const {data:menu} = useQuery(['shopMenu'],() => getMenu(route.params.id,), {
    enabled: !!route.params.id,
    suspense: true,
  });
  const {data:review} = useQuery(['shopReview'],() => getReview(route.params.id), {
    enabled: !!route.params.id,
    suspense: true,
  });

  useEffect(() => {
    if(Platform.OS === 'android') {
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
      StatusBar.setBarStyle('dark-content');
    }
  }, []);

  const [isCreatingReview, setIsCreatingReview] = useState(false);

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
            <Header>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Back />
              </TouchableOpacity>

              <Title>{shop.shop_name}</Title>
              <View style={{width: 24, backgroundColor: 'none'}}></View>
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
                {menu.map((item:MenuType, index:number) => (
                  <>
                    <Menu
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
                {review.filter((item:ReviewDataType) => item.myReview).length === 0 ?
                    <CreateReview shop_uuid={route.params.id}/> : null}
                <Spacer6/>

                {review.map((item:ReviewDataType, index:number) => (
                    item.myReview ?
                        <>
                          <Review
                              user={item.user_name}
                              key={index}
                              title={item.shop_review_title}
                              content={item.shop_review_detail}
                              rating={item.shop_review_rating}
                              date={item.shop_review_updated_date}
                              myReview={item.myReview}
                              shopUuid={item.shop_uuid}
                              reviewId={item.review_id}
                          />
                          <Spacer7 />
                        </>
                        : null
                ))}
                <Spacer5 />
                <ReviewTitle>다른 사용자들의 리뷰</ReviewTitle>
                <Spacer6 />
                {review.map((item:ReviewDataType, index:number) => (
                    !item.myReview ?
                        <>
                    <Review
                      key={index}
                      title={item.shop_review_title}
                      content={item.shop_review_detail}
                      user={item.user_id}
                      rating={item.shop_review_rating}
                      date={item.shop_review_updated_date}
                      myReview={item.myReview}
                     shopUuid={item.shop_uuid}
                      reviewId={item.review_id}
                    />
                    <Spacer7 />
                    </>
                  : null
                ))}
              </Container>
            </ScrollView>
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

















const timeForToday = (value) => {
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




const ReviewTitle = styled.Text`
  font-size: 19px;
`



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

const GradeComponent = ({grade}:{
  grade:number
}) => {
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
