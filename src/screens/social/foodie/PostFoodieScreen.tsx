import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { CompositeNavigationProp, RouteProp, useNavigation } from '@react-navigation/native'
import { RootNativeStackParamList } from '@/navigations/RootNavigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '@/navigations/BottomTabs';
import React, { useEffect, useState } from 'react';
import * as S from './FoodieScreen.style'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Alert, Button, Keyboard, Text, TouchableWithoutFeedback } from 'react-native';
import theme from '@/common/style/theme';
import { foodieRequest } from '@/api/foodieRequest'
import { useRecoilValue } from 'recoil';
import { userStatesAtom } from '@/recoil/atoms/userStatesAtom'
import { ScreenType } from '@/types/postGroupTypes';
import { FoodieBoard } from '@/types/socialType';

type GroupNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootNativeStackParamList, 'Stack'>,
  BottomTabNavigationProp<TabParamList>
>

type RootStackParamList = {
  PostFoodieScreen: { screenType: ScreenType, boardData?: FoodieBoard },
};
type PostScreenRouteProp = RouteProp<RootStackParamList, 'PostFoodieScreen'>;
type PostScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PostFoodieScreen'>;

type PostScreenProps = {
  route: PostScreenRouteProp;
  navigation: PostScreenNavigationProp;
};

const PostFoodieScreen: React.FC<PostScreenProps> = ({ route }) => {
  const { screenType, boardData } = route.params;
  const navigation = useNavigation<GroupNavigationProp>()
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { insertFoodie, patchFoodie } = foodieRequest
  const user = useRecoilValue(userStatesAtom);
  const isPost = screenType === "Post";

  // state 변수 업데이트 함수 정의
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleImageAttach = () => {

  }

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handlePost = async () => {
    if (!title || !content) {
      Alert.alert('맛잘알 글쓰기 실패', '제목과 내용을 입력해주세요.');
      return;
    }

    try {
      const data = {
        title: title,
        content: content,
        token: user.accessToken
      }
      if (user.user) {
        if (screenType == "Post") {
          const response = await insertFoodie(data)
          if (response) {
            console.log("맛잘알 생성 성공")
            console.log(response)
            navigation.navigate('Tab', { screen: 'Social', params: { tab: 'foodie' } })
          }
        }
        else {
          if (boardData?.id) {
            const response = await patchFoodie(data, boardData.id)
            if (response) {
              console.log("맛잘알 수정 성공")
              console.log(response)
              navigation.navigate('Tab', { screen: 'Social', params: { tab: 'foodie' } })
            }
          }
        }
      }


    } catch (error: any) {
      const { msg } = error
      Alert.alert('맛잘알 생성 실패', msg ? msg : '맛잘알 생성에 실패했습니다.')
    }
  }

  const resetState = () => {
    setTitle('');
    setContent('');
  };

  const setState = () => {
    if (boardData) {
      setTitle(boardData.title);
      setContent(boardData.content);
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const isPost = screenType === "Post";
      navigation.setOptions({
        headerTitleAlign: 'center',
        headerTitle: isPost ? '맛잘알 글쓰기' : '맛잘알 수정',
        headerLeft: () => (
          <Icon name="chevron-left" size={28} onPress={() => navigation.navigate('Tab', { screen: 'Social', params: { tab: 'foodie' } })} />
        )
      })
      if (isPost) {
        resetState();
      }
      else {
        setState();
      }
    });

    return unsubscribe;
  }, [navigation, screenType, boardData])

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <S.PostContainer>
        <S.TitleInput
          style={{ padding: 10 }}
          placeholder="제목"
          value={title}
          onChangeText={text => handleTitleChange(text)}>
        </S.TitleInput>
        <S.BtnArea style={{ flexDirection: 'row' }}>
          <S.AttachBtn onPress={(handleImageAttach)}>
            <Icon name="image" color={theme.colors.primary} size={24} />
          </S.AttachBtn>
          <S.AttachBtn onPress={(handleImageAttach)}>
            <Icon name="camera" color={theme.colors.primary} size={24} />
          </S.AttachBtn>
        </S.BtnArea>
        <S.ContentInput
          placeholder="내용을 입력해주세요"
          value={content}
          onChangeText={text => handleContentChange(text)}
          multiline>
        </S.ContentInput>
        <S.Btn onPress={handlePost}><S.BtnText>{isPost ? '등록' : '수정'}</S.BtnText></S.Btn>
      </S.PostContainer>
    </TouchableWithoutFeedback>
  );
}
export default PostFoodieScreen