import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { RootNativeStackParamList } from '@/navigations/RootNavigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '@/navigations/BottomTabs';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

type GroupNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootNativeStackParamList, 'Stack'>,
  BottomTabNavigationProp<TabParamList>
>

const PostFoodieScreen = () => {
  const navigation = useNavigation<GroupNavigationProp>()

  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: '맛잘알 글쓰기',
      headerLeft: () => (
        <Icon name="chevron-left" size={28} onPress={() => navigation.navigate('Tab', { screen: 'Social', params: { tab: 'foodie' } })} />
      ),
    })
  }, [navigation])
  return null;
}
export default PostFoodieScreen