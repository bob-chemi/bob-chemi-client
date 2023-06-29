import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { RootNativeStackParamList } from '@/navigations/RootNavigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '@/navigations/BottomTabs';
import React, { useEffect, useState } from 'react';
import * as S from '../commonComp/GroupScreen.style'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { View } from 'react-native';
import PostImgComp from '../commonComp/PostImgComp';
import PostTextComp from '../commonComp/PostTextComp';

type GroupNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootNativeStackParamList, 'Stack'>,
  BottomTabNavigationProp<TabParamList>
>

const PostFoodieScreen = () => {
  const navigation = useNavigation<GroupNavigationProp>()
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // state 변수 업데이트 함수 정의
  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleDescriptionChange = (newDescription: string) => {
    setDescription(newDescription);
  };

  const resetState = () => {
    setTitle('');
    setDescription('');
  };

  const CreateFoodiePressed = async () => {

  }

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
    })
    return unsubscribe;
  }, [navigation])

  return (
    <S.PostContainer>
      <View>
        <PostImgComp></PostImgComp>
        <PostTextComp text={title} OnChangeText={handleTitleChange} headTitle='제목' height={35} isContent={false}></PostTextComp>
        <PostTextComp text={description} OnChangeText={handleDescriptionChange} headTitle='내용' height={400} isContent={true}></PostTextComp>
      </View>
      <S.Btn onPress={CreateFoodiePressed}><S.BtnText>등록</S.BtnText></S.Btn>
    </S.PostContainer>
  );
}
export default PostFoodieScreen