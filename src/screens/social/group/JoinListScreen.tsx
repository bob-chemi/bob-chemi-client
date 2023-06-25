import React, { useEffect, useState } from 'react'
import * as S from './GroupScreen.style'
import { FlatList, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { groupRequest } from '@/api/groupRequest'
import { Group, GroupRequest, groupRequestVirtualData } from '@/types/socialType'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { RootNativeStackParamList } from '@/navigations/RootNavigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '@/navigations/BottomTabs';
import { useRecoilValue } from 'recoil';
import { userStatesAtom } from '@/recoil/atoms/userStatesAtom'
import theme from '@/common/style/theme';

type GroupNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootNativeStackParamList, 'Stack'>,
  BottomTabNavigationProp<TabParamList>
>

const JoinListScreen = () => {
  const navigation = useNavigation<GroupNavigationProp>()
  const { getCreatedGroup, getGroupPending, AcceptGroupRequest, DenyGroupRequest } = groupRequest
  const user = useRecoilValue(userStatesAtom);
  const [requestGroupList, setRequestGroupList] = useState<GroupRequest[]>([]);

  const getCreatedList = async () => {
    const userId = user?.user?.id;
    const response = await getCreatedGroup(userId);
    if (response) {
      console.log('내가 만든 소모임 가져오기 성공')
      console.log(response);
      response.forEach((r: { groupId: number, title: string }) => {
        getJoinRequest(r.groupId, r.title);
      });
    } else {
      console.log('실패')
    }
  }

  const getJoinRequest = async (groupId: number, title: string) => {
    const response = await getGroupPending(groupId);
    if (response) {
      console.log('가입 대기중인 멤버 조회')
      console.log(response);
      response.forEach((r: { id: string }) => {
        requestGroupList.push({ title: title, pendingId: r.id, groupId: groupId });
        setRequestGroupList([...requestGroupList]);
      });
    } else {
      console.log('실패')
    }
  }

  const handleAccept = async (request: GroupRequest) => {
    const response = await AcceptGroupRequest(request);
    console.log(response);
  };

  const handleDeny = async (request: GroupRequest) => {
    const response = await DenyGroupRequest(request);
    console.log(response);
  };

  const renderGroupRequest = ({ item }: { item: GroupRequest }) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 12, alignItems: 'center', borderBottomColor: theme.colors.gray200, borderBottomWidth: 1 }}>
        <S.RequestTextView>
          <Text>
            <S.GroupTitleText>{item.title}</S.GroupTitleText>에 <S.GroupTitleText>{item.pendingId}</S.GroupTitleText>님이 가입 신청을 하였습니다.
          </Text>
        </S.RequestTextView>
        <S.RequestBtnView>
          <S.RequestBtnBtn onPress={() => handleAccept(item)} style={{}}>
            <S.BtnText>수락
            </S.BtnText>
          </S.RequestBtnBtn>
          <S.RequestBtnBtn onPress={() => handleDeny(item)}>
            <S.BtnText>거절
            </S.BtnText>
          </S.RequestBtnBtn>
        </S.RequestBtnView>
      </View>
    )
  }

  useEffect(() => {
    const handleNavigationFocus = () => {
      getCreatedList();
    };
    const unSubscribe = navigation.addListener('focus', handleNavigationFocus);
    navigation.setOptions({
      headerTitleAlign: 'center',
      headerTitle: '알림',
      headerTitleContainerStyle: { justifyContent: 'center', alignContent: 'center' },
      headerLeft: () => (
        <Icon name="chevron-left" size={28} onPress={() => navigation.navigate('Tab', { screen: 'Social', params: { tab: 'group' } })} />
      ),
    })

    return unSubscribe;
  }, [])

  useEffect(() => {
    getCreatedList();
  }, [])

  return (
    <S.Container>
      <FlatList
        data={requestGroupList}
        renderItem={renderGroupRequest}
        keyExtractor={(item) => item.pendingId}>

      </FlatList>
    </S.Container>
  );
}

export default JoinListScreen
