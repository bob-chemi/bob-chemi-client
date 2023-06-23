import { RouteProp } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import FoodieScreen from './foodie/FoodieScreen'
import GroupScreen from './group/GroupScreen'
import * as S from './SocialScreen.style'
import { ParamList } from '@/types/socialType'

type SocialScreenRouteProp = RouteProp<ParamList, 'SocialScreen'>

type SocialProps = {
  route: SocialScreenRouteProp
}

const SocialScreen: React.FC<SocialProps> = ({ route }) => {
  const [activeTab, setActiveTab] = route.params ? useState(route.params.tab) : useState('group')

  const renderContent = () => {
    if (activeTab === 'group') {
      return (
        <S.TabViewContainer>
          <GroupScreen />
        </S.TabViewContainer>
      )
    } else if (activeTab === 'foodie') {
      return (
        <S.TabViewContainer>
          <FoodieScreen />
        </S.TabViewContainer>
      )
    }
  }

  return (
    <S.Container>
      <S.TabArea>
        <TouchableOpacity onPress={() => setActiveTab('group')} style={{ marginRight: 20 }}>
          <S.TabText isActive={activeTab === 'group'}>소모임</S.TabText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('foodie')}>
          <S.TabText isActive={activeTab === 'foodie'}>맛잘알</S.TabText>
        </TouchableOpacity>
      </S.TabArea>

      {renderContent()}
    </S.Container>
  )
}

export default SocialScreen
