import StarFill from "@assets/icons/star_fill.svg";
import Star from "@assets/icons/star.svg";
import React, {useEffect, useState} from "react";
import styled from "styled-components/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useQuery, useMutation, useQueryClient} from "react-query";
import {deleteReview, editReview} from "@/lib/api/review";
import {ConfirmButton} from "react-native-modal-datetime-picker";
import {TouchableOpacity} from "react-native";

interface ReviewPropType {
  title: string;
  content: string;
  user: string;
  rating: number;
  date: string;
  myReview: boolean;
  shopUuid: string;
  reviewId: string;
}
const Review = ({title, content, user, rating, date,myReview, shopUuid,reviewId} : ReviewPropType) => {
  const [myReviewState, setMyReviewState] = useState(
      {
        title: title,
        content: content,
        rating: rating,
      }
  )
  const queryClient = useQueryClient()

  const deleteReviewMutation = useMutation({
    mutationFn:  ()=> deleteReview(shopUuid),
    // When mutate is called:
    onMutate: async (deletedShopReview:[]) => {
      await queryClient.cancelQueries({ queryKey: ['shopReview'] })

      const previousShopReview  = queryClient.getQueryData(['shopReview'])
      queryClient.setQueryData(['shopReview'], (old) => old.filter((e) => e.shop_uuid !== shopUuid))
      return { previousShopReview }
    },

    onError: (err, _, context) => {
      queryClient.setQueryData(['shopReview'], context.previousShopReview)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['shopReview'] })
    },
  })

  const editReviewMutation = useMutation({
    mutationFn: editReview,
    onMutate: async (newReview:any) => {
      await queryClient.cancelQueries({ queryKey: ['shopReview', newReview.review_id] })
      const previousReview = queryClient.getQueryData(['shopReview', newReview.review_id])
      queryClient.setQueryData(['shopReview', newReview.review_id], {
        "review_id": newReview.reviewId,
        "shop_uuid": newReview.shopId,
        "shop_review_title": newReview.title,
        "shop_review_content": newReview.detail,
        "shop_review_rating": newReview.rating,
      })
      return { previousReview, newReview }
    },
    onError: (err, newReview, context) => {
      queryClient.setQueryData(
          ['shopReview', context.newReview.review_id],
          context.previousReview,
      )
    },
    onSettled: (newReview) => {
      queryClient.invalidateQueries({ queryKey: ['shopReview', newReview.review_id] })
    },
  })

  function DeleteReviewComponent({shopId} : {shopId:string}) {
    return(
        <DeleteReviewTouchableOpacity onPress={() => deleteReviewMutation.mutate(shopId)}>
          <DeleteReviewText>리뷰 삭제</DeleteReviewText>
        </DeleteReviewTouchableOpacity>
    );
  }
  const [isReviewEdit, setIsReviewEdit] = useState(false);
  function EditReviewComponent({shopId} : {shopId:string}) {
    return(
        <EditReviewTouchableOpacity onPress={() =>
        {
          setIsReviewEdit(true);
          setMyReviewState(
              {
                title: title,
                content: content,
                rating: rating,
              }
          )
        }}>
          <EditReviewText>리뷰 수정</EditReviewText>
        </EditReviewTouchableOpacity>
    );
  }

  function CancelEditReviewComponent()
  {
    return (
        <CancelEditReviewTouchableOpacity onPress={() => setIsReviewEdit(false)}>
          <CancelEditReviewText>취소</CancelEditReviewText>
        </CancelEditReviewTouchableOpacity>
    );
  }
  function ConfirmEditReviewComponent()
  {
    return (
        <ConfirmEditReviewTouchableOpacity onPress={() => {
            setIsReviewEdit(false)
            editReviewMutation.mutate(
                {
                  reviewId: reviewId,
                  shopId: shopUuid,
                  title: myReviewState.title,
                  detail: myReviewState.content,
                  rating: myReviewState.rating,
                }
            );
          }
        }>
          <ConfirmEditReviewText>변경</ConfirmEditReviewText>
        </ConfirmEditReviewTouchableOpacity>
    );
  }

  const confirmEdit = () => {
    //todo
    setIsReviewEdit(false);
  };

  useEffect(() => {
    console.log(myReview);
  },[]);
  const timeForToday = (value:string):string => {
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

  return (
      <ReviewContainer>
        <UserContainer>
          <UserImage source={{uri: 'https://picsum.photos/200'}} />
          <RatingSpacer />
          {myReview ?
              <Username>
                내 리뷰
              </Username>
              :
              <Username>
                {user.substring(0, 3) + '*'.repeat(user.length - 3)}님
              </Username>
          }
          <RatingSpacer />
          <ReviewDate>{timeForToday(date)}</ReviewDate>
        </UserContainer>
        <RatingColumnSpacer />
        {
          !isReviewEdit?
        <RatingContainer>
          {Array.from({length: rating}, (v, i) => (
              <StarFill key={i} width={24} height={24} />
          ))}
          {Array.from({length: 5 - rating}, (v, i) => (
              <Star key={i} />
          ))}
          <RatingText>{rating}.0/5.0점</RatingText>
        </RatingContainer>
        :

          <RatingContainer>
            {Array.from({length: myReviewState.rating}, (v, i) => (
                <TouchableOpacity onPress={() => setMyReviewState({...myReviewState, rating: i+1})}>
                <StarFill key={i} width={34} height={34} />
                </TouchableOpacity>
            ))}
            {Array.from({length: 5 - myReviewState.rating}, (v, i) => (
                <TouchableOpacity onPress={() => setMyReviewState({...myReviewState, rating: myReviewState.rating + i+1})}>
                <Star key={i} width={34} height={34}/>
                </TouchableOpacity>
            ))}
            <RatingText>{myReviewState.rating}.0/5.0점</RatingText>
          </RatingContainer>
        }
        <RatingColumnSpacer2 />
        {
          !isReviewEdit ?
              <>
                <ReviewTitle>{title}</ReviewTitle>
                <ReviewContent>{content}</ReviewContent>
              </>
          ://null
              <>
                <EditReviewTitle value={myReviewState.title} onChange={
                  (e) => {
                    setMyReviewState({ ...myReviewState, title: e.nativeEvent.text });
                  }
                }/>
                <EditReviewContent value={myReviewState.content} onChange={
                  (e) => {
                    setMyReviewState({ ...myReviewState, content: e.nativeEvent.text });
                  }
                }/>
              </>
        }
        {
          myReview ?
              <Row>
                {!isReviewEdit ?
                <>
                  <EditReviewComponent shopId = {shopUuid}/>
                  <DeleteReviewComponent shopId={shopUuid}/>
                </>
                :
                <>
                  <ConfirmEditReviewComponent/>
                  <CancelEditReviewComponent/>
                </>}
              </Row>
              :
              null
        }
      </ReviewContainer>
  );
};

export default Review;





const Row = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-top: 3%;
`;

const EditReviewTouchableOpacity = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48%;
  height: 49px;
  border-radius: 8px;
  background-color: #EBF9F1;
`;

const EditReviewText = styled.Text`
  font-size: 16px;
  color: #3DAB70;
`;

const DeleteReviewTouchableOpacity = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48%;
  height: 49px;
  background-color: #ED4650;
  border-radius: 8px;
`;
const DeleteReviewText = styled.Text`
  font-size: 16px;
  color: white;
`;

const ConfirmEditReviewTouchableOpacity = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48%;
  height: 49px;
  border-radius: 8px;
  background-color: #EBF9F1;
`;

const ConfirmEditReviewText = styled.Text`
  font-size: 16px;
  color: #3DAB70;
`;

const CancelEditReviewTouchableOpacity = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48%;
  height: 49px;
  background-color: #ED4650;
  border-radius: 8px;
`;
const CancelEditReviewText = styled.Text`
  font-size: 16px;
  color: white;
`;

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

const EditReviewTitle = styled.TextInput`
  font-size: 22px;
  font-weight: bold;
  margin-top: 8px;
`;

const EditReviewContent = styled.TextInput`
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