import React, { useEffect, useState } from 'react'
import * as S from './GroupScreen.style'
import { Alert, FlatList, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { groupRequest } from '@/api/groupRequest'
import { Group, GroupRequest } from '@/types/socialType'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native'
import { RootNativeStackParamList } from '@/navigations/RootNavigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { TabParamList } from '@/navigations/BottomTabs';
import { useRecoilValue } from 'recoil';
import { userStatesAtom } from '@/recoil/atoms/userStatesAtom'
import theme from '@/common/style/theme';
import { User } from '@/types/userType';
import { Nav } from '@/types/nav';

type GroupNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootNativeStackParamList, 'Stack'>,
  BottomTabNavigationProp<TabParamList>
>

const JoinListScreen = () => {
  const { navigate } = useNavigation<Nav>()
  const navigation = useNavigation<GroupNavigationProp>()
  const { getCreatedGroup, getGroupPending, acceptGroupRequest, denyGroupRequest } = groupRequest
  const user = useRecoilValue(userStatesAtom);
  const [requestGroupList, setRequestGroupList] = useState<GroupRequest[]>([]);

  const getCreatedList = async () => {
    if (user.user) {
      const userId = user.user?.id
      const response = await getCreatedGroup(userId);
      if (response) {
        response.forEach((r: { groupId: number, title: string }) => {
          getJoinRequest(r.groupId, r.title);
        });
      } else {
        console.log('실패')
      }
    }
  }

  const getJoinRequest = async (groupId: number, title: string) => {
    const response = await getGroupPending(groupId);
    if (response) {
      const newGroupRequests = response.map((r: { user: User["user"], memberId: string }) => ({
        title: title,
        groupId: groupId,
        pendingUser: r.user,
        MemberId: r.memberId
      }));
      setRequestGroupList((prevGroupRequests) => [...prevGroupRequests, ...newGroupRequests]);
    } else {
      console.log('실패')
    }
  }

  const handleAccept = async (request: GroupRequest) => {
    const response = await acceptGroupRequest(request);
    if (response) {
      Alert.alert(
        '신청 수락',
        '가입 신청이 수락 되었습니다.',
        [
          { text: "확인", style: "default" }
        ]
      )
      setRequestGroupList([]);
      await getCreatedList();
    }
  };

  const handleDeny = async (request: GroupRequest) => {
    const response = await denyGroupRequest(request);
    if (response) {
      Alert.alert(
        '신청 거절',
        '가입 신청이 거절 되었습니다.',
        [
          { text: "확인", style: "default" }
        ]
      )
      setRequestGroupList([]);
      await getCreatedList();
    }
  };

  const renderGroupRequest = ({ item }: { item: GroupRequest }) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, paddingVertical: 12, alignItems: 'center', borderBottomColor: theme.colors.gray200, borderBottomWidth: 1 }}>
        <S.RequestTextView>
          <Text>
            <S.GroupTitleText>{item.title}</S.GroupTitleText>에 <S.GroupTitleText>{item.pendingUser?.email}</S.GroupTitleText>님이 가입 신청을 하였습니다.
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
    const handleNavigationFocus = async () => {
      setRequestGroupList([]);
      await getCreatedList();
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

  return (
    <S.Container>
      <FlatList
        data={requestGroupList}
        renderItem={renderGroupRequest}
        keyExtractor={(item, i) => i.toString()}>
      </FlatList>
    </S.Container>
  );
}

export default JoinListScreen
