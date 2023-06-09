import SliderHandler from '@assets/icons/sliderHandler.svg'
import React, { Dispatch, ForwardedRef, forwardRef } from 'react'
import { Pressable, View } from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel'
import styled from 'styled-components/native'
import SliderStackNavigation from '../navigations/SliderStackNavigatoin'

const Layout = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow-y: scroll;
`

const Handler = styled.View`
  height: 30px;
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
    const [sliderCurrentPosition, setSliderCurrentPosition] = React.useState(0)

    // Refs

    // Functions

    const controlSliderShowing = () => {
      if (typeof ref === 'object' && ref?.current) {
        if (sliderCurrentPosition === 0) {
          ref.current.show()
        } else if (sliderCurrentPosition === 600) {
          ref.current.hide()
        }
      }
    }

    const onBottomReached = () => {
      console.log('슬라이더 닫힘')
      setSliderShowing(false)
    }

    const handleSliderShowing = (position: number) => {
      console.log(position)
      if (position === 0) {
        setSliderCurrentPosition(0)
        setSliderShowing(false)
      } else if (position === 600) {
        setSliderCurrentPosition(600)
        setSliderShowing(true)
      }
    }

    // 디버깅

    return (
      <SlidingUpPanel
        ref={ref}
        draggableRange={{ top: 600, bottom: 30 }}
        height={600}
        showBackdrop={false}
        friction={0.5}
        snappingPoints={[0, 600]}
        onBottomReached={onBottomReached}
        onMomentumDragEnd={handleSliderShowing}
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
