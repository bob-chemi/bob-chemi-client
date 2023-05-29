import React, { useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, FlatList, View } from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel'
import styled from 'styled-components/native'
import RestaurantCard from './nearByRestaurants/RestaurantCard'

const { height } = Dimensions.get('window')

const Layout = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: lightcoral;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow-y: scroll;
`

const Handler = styled.View`
  height: 40px;
  background-color: teal;
`

interface RestaurantsSliderProps {
  nearByRestaurants: any[]
}

const RestaurantsSlider = ({ nearByRestaurants }: RestaurantsSliderProps) => {
  // Constants
  const draggedValue = new Animated.Value(180)

  // States

  // Refs
  const sliderPanelRef = useRef<SlidingUpPanel>(null)

  // Functions
  const renderRestaurantCard = ({ item, index }: { item: any; index: number }) => {
    return <RestaurantCard item={item} index={index} />
  }

  // 디버깅

  return (
    <SlidingUpPanel
      ref={sliderPanelRef}
      draggableRange={{ top: height * 0.7, bottom: 40 }}
      height={height * 0.7}
      animatedValue={draggedValue}
      allowMomentum
      snappingPoints={[40, height * 0.7]}
      showBackdrop={false}
      // onDragStart={() => console.log('onDragStart')}
      // onDragEnd={() => console.log('onDragEnd')}
      // onMomentumDragStart={() => console.log('onMomentumDragStart')}
      // onMomentumDragEnd={() => console.log('onMomentumDragEnd')}
    >
      <Layout>
        <Handler />
        {/* {nearByRestaurants && nearByRestaurants.map((item, index) => <RestaurantCard key={index} item={item} />)} */}
        <View style={{ flex: 1, width: '100%' }}>
          <FlatList
            style={{ width: '100%', flex: 1 }}
            data={nearByRestaurants}
            renderItem={renderRestaurantCard}
            contentContainerStyle={{ width: '100%', backgroundColor: '#e8eff5' }}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        </View>
      </Layout>
    </SlidingUpPanel>
  )
}

export default RestaurantsSlider
