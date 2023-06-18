import React, { ForwardedRef, forwardRef, useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, FlatList, Pressable, Text, View } from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel'
import styled from 'styled-components/native'

const { height } = Dimensions.get('window')

const MainLayout = styled.View`
  flex: 1;
  background-color: lightblue;
  align-items: center;
  justify-content: center;
`

const Layout = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow-y: scroll;
  background-color: lightgreen;
`

const Handler = styled.View`
  height: 40px;
  background-color: lightpink;
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`

const TempScreen = () => {
  // Constants

  // States

  // Refs
  const tempRef = useRef<SlidingUpPanel | null>(null)
  // Functions

  const showSlider = () => {
    console.log('클릭')
    if (tempRef.current) {
      tempRef.current.show()
    }
  }

  // 디버깅

  return (
    <>
      <MainLayout>
        <Text onPress={showSlider}>열기</Text>
      </MainLayout>
      <SlidingUpPanel
        ref={tempRef}
        draggableRange={{ top: 600, bottom: 40 }}
        height={600}
        showBackdrop={false}
        friction={0.5}
        snappingPoints={[200]}
        // onDragStart={() => console.log('onDragStart')}
        // onDragEnd={() => console.log('onDragEnd')}
        // onMomentumDragStart={() => console.log('onMomentumDragStart')}
        // onMomentumDragEnd={() => console.log('onMomentumDragEnd')}
      >
        <Layout>
          <Handler>
            <Pressable>
              <Text>핸들러</Text>
            </Pressable>
          </Handler>
          {/* {nearByRestaurants && nearByRestaurants.map((item, index) => <RestaurantCard key={index} item={item} />)} */}
          <View style={{ flex: 1, width: '100%' }}>
            <Text>테스트</Text>
          </View>
        </Layout>
      </SlidingUpPanel>
    </>
  )
}

export default TempScreen
