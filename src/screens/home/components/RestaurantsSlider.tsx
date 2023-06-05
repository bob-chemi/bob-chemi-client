import SliderHandler from '@assets/icons/sliderHandler.svg'
import React, { Dispatch, ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, FlatList, Pressable, Text, View } from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel'
import styled from 'styled-components/native'
import SliderStackNavigation from '../navigations/SliderStackNavigatoin'
import RestaurantCard from './nearByRestaurants/RestaurantCard'

const { height } = Dimensions.get('window')

const Layout = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow-y: scroll;
`

const Handler = styled.View`
  height: 20px;
  background-color: white;
  width: 100%;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`

interface RestaurantsSliderProps {
  nearByRestaurants: any[]
  setSliderShowing: Dispatch<React.SetStateAction<boolean>>
}

const RestaurantsSlider = forwardRef(
  ({ nearByRestaurants, setSliderShowing }: RestaurantsSliderProps, ref: ForwardedRef<SlidingUpPanel | null>) => {
    // Constants

    // States

    // Refs

    // Functions
    const renderRestaurantCard = ({ item, index }: { item: any; index: number }) => {
      return <RestaurantCard item={item} index={index} />
    }

    const controlSliderShowing = () => {
      if (typeof ref === 'object' && ref?.current) {
        console.log(ref.current)
        ref.current.show()
      }
    }

    const onBottomReached = () => {
      console.log('슬라이더 닫힘')
      setSliderShowing(false)
    }

    // 디버깅

    return (
      <SlidingUpPanel
        ref={ref}
        draggableRange={{ top: 600, bottom: 40 }}
        height={600}
        showBackdrop={false}
        friction={0.5}
        snappingPoints={[0, 600]}
        onBottomReached={onBottomReached}
      >
        <Layout>
          <Handler>
            <Pressable onPress={controlSliderShowing}>
              <SliderHandler />
            </Pressable>
          </Handler>

          <View style={{ flex: 1, width: '100%' }}>
            <SliderStackNavigation />
          </View>
        </Layout>
      </SlidingUpPanel>
    )
  }
)

export default RestaurantsSlider
