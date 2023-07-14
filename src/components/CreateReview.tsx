import React, {useState} from 'react';
import {useMutation, useQueryClient} from "react-query";
import {Slider, Text, TextInput, TouchableOpacity} from "react-native";
import styled from "styled-components/native";
import {postReview} from "@/lib/api/review";
import StarFill from "@assets/icons/star_fill.svg";
import Star from "@assets/icons/star.svg";

interface ReviewType {
  shopUuid: string;
  title: string;
  content: string;
  rating: number;
}

const CreateReview = ({shop_uuid}: {shop_uuid: string}) => {
  const queryClient = useQueryClient();

  const [isCreatingReivew, setIsCreatingReivew] = useState(false);
  const [myReviewState, setMyReviewState] = useState({
    title: "",
    content: "",
    rating: 5,
  })


  const createReviewMutation = useMutation({
    mutationFn: postReview,
    onMutate: async (newReview) => {
      await queryClient.cancelQueries({ queryKey: ['shopReview'] })
      const previousShopReview = queryClient.getQueryData(['shopReview'])
      const finalReview = {...newReview, myReview:true}
      queryClient.setQueryData(['shopReview'], (old) => [...old, finalReview])
      return { previousShopReview }
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['shopReview'], context.previousShopReview)
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['shopReview']})
    }
  });

  if(isCreatingReivew) {
    return (
        <>
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

        <EditReviewTitle
            placeholder={"리뷰 제목을 입력해주세요."}
            value={myReviewState.title} onChange={
          (e) => {
            setMyReviewState({ ...myReviewState, title: e.nativeEvent.text });
          }
        }/>
        <EditReviewContent
            placeholder={"리뷰 내용을 입력해주세요."}
            value={myReviewState.content} onChange={
          (e) => {
            setMyReviewState({ ...myReviewState, content: e.nativeEvent.text });
          }
        }/>
        <Row>
          <ConfirmCreateReviewTouchableOpacity onPress={() => {
            createReviewMutation.mutate({
              shopId: shop_uuid,
              title: myReviewState.title,
              detail: myReviewState.content,
              rating: myReviewState.rating
            });
            setIsCreatingReivew(false)
          }}>
            <ConfirmCreateReviewText>리뷰 작성</ConfirmCreateReviewText>
          </ConfirmCreateReviewTouchableOpacity>

          <CancelCreateReviewTouchableOpacity onPress={()=>{
            setIsCreatingReivew(false);
          }}>
            <CancelCreateReviewText>취소</CancelCreateReviewText>
          </CancelCreateReviewTouchableOpacity>
        </Row>
      </>
    );
  }
  return (
      <CreateReviewTouchableOpacity onPress={() => {
        setIsCreatingReivew(!isCreatingReivew)
      }}>
        <ConfirmCreateReviewText>
          리뷰 작성하기
        </ConfirmCreateReviewText>
      </CreateReviewTouchableOpacity>
  );
}

export default CreateReview;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
const RatingText = styled.Text`
  font-size: 16px;
  color: #3dab70;
  margin-left: 18px;
`;

const Row = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-top: 3%;
`;

const ConfirmCreateReviewTouchableOpacity = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48%;
  height: 49px;
  border-radius: 8px;
  background-color: #EBF9F1;
`;

const CancelCreateReviewTouchableOpacity = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48%;
  height: 49px;
  background-color: #ED4650;
  border-radius: 8px;
`;

const EditReviewTitle = styled(TextInput)`
  font-size: 22px;
  font-weight: bold;
  margin-top: 8px;
`;

const EditReviewContent = styled(TextInput)`
  font-size: 19px;
  color: #3b3b3b;
  margin-top: 8px;
  line-height: 28px;
`;
const CreateReviewTouchableOpacity = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 49px;
  border-radius: 8px;
  background-color: #EBF9F1;
`;

const CancelCreateReviewText = styled.Text`
  font-size: 16px;
  color: white;
`;

const ConfirmCreateReviewText = styled.Text`
  color: #3DAB70;
  font-size: 19px;
`




const Title = styled(Text)`
  color: #27292F;
  text-align: center;
  font-size: 23px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: -0.408px;
`;

const Content = styled(Text)`
  color: #000;
  text-align: center;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  margin-top: 8px;
  line-height: 25.5px;
  letter-spacing: -0.408px;
`;



const Button = styled(TouchableOpacity)`
  width: 100%;
  height: 55px;
  flex-shrink: 0;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background: #3DAB55;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled(Text)`
  color: #ffffff;
  text-align: center;
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  letter-spacing: -0.408px;
`;


const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  justify-content: center;
  align-items: center;
`

const ModalContainer = styled.View`
  width: 85%;
  height: 350px;
  background-color: #fff;
  display: flex;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
  padding-top: 39px;
  box-shadow: 1px 4px 10px rgba(49, 49, 49, 0.29);
`;

const Group = styled.View`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
