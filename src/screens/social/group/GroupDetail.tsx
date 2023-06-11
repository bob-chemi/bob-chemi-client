import React, { useEffect } from 'react'
import { GroupParamList } from '../navigations/GroupNav';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { RootNativeStackParamList } from '@/navigations/RootNavigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '@/navigations/BottomTabs';
import { RouteProp } from '@react-navigation/native';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

type GroupDetailRouteProp = RouteProp<GroupParamList, 'GroupDetail'>;

type GroupDetailProps = {
  route: GroupDetailRouteProp;
};

type GroupNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootNativeStackParamList, 'Stack'>,
  BottomTabNavigationProp<TabParamList>
>

const GroupDetail: React.FC<GroupDetailProps> = ({ route }) => {
  const navigation = useNavigation<GroupNavigationProp>()
  useEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: '소모임 Title',
      headerTitleContainerStyle: { justifyContent: 'center', alignContent: 'center' },
      headerLeft: () => (
        <Icon name="chevron-left" size={28} onPress={() => navigation.navigate('Tab', { screen: 'Social' })} />
      ),
    })
  }, [navigation])

  return <View><Text>{route.params.groupId}</Text></View>;
}

export default GroupDetail
