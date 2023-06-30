import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { RootNativeStackParamList } from '@/navigations/RootNavigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '@/navigations/BottomTabs';
import React, { useEffect, useState } from 'react';
import * as S from './FoodieScreen.style'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Alert, Button, Keyboard, Text, TouchableWithoutFeedback } from 'react-native';
import theme from '@/common/style/theme';
import { foodieRequest } from '@/api/foodieRequest'

type GroupNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootNativeStackParamList, 'Stack'>,
  BottomTabNavigationProp<TabParamList>
>

const PostFoodieScreen = () => {
  const navigation = useNavigation<GroupNavigationProp>()
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { insertFoodie } = foodieRequest

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
    console.log(title);
    console.log(content);
    if (!title || !content) {
      Alert.alert('맛잘알 글쓰기 실패', '제목과 내용을 입력해주세요.');
      return;
    }

    try {
      const FoodieData = {
        title: title,
        content: content
      }
      const response = await insertFoodie(FoodieData)
      if (response) {
        console.log("맛잘알 생성 성공")
        console.log(response)
        navigation.navigate('Tab', { screen: 'Social', params: { tab: 'foodie' } })
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      resetState();
    });
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: '맛잘알 글쓰기',
      headerLeft: () => (
        <Icon name="chevron-left" size={28} onPress={() => navigation.navigate('Tab', { screen: 'Social', params: { tab: 'foodie' } })} />
      ),
      headerRight: () => (
        <S.PostBtn onPress={handlePost}><S.BtnText>등록</S.BtnText></S.PostBtn>
      )
    })
    return unsubscribe;
  }, [navigation])

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <S.PostContainer>
        <S.TitleInput
          style={{ padding: 10 }}
          placeholder="제목"
          value={title}
          onChangeText={handleTitleChange}>
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
          onChangeText={handleContentChange}
          multiline>
        </S.ContentInput>
      </S.PostContainer>
    </TouchableWithoutFeedback>
  );
}
export default PostFoodieScreen