import React, { useEffect } from 'react'
import UsersIcon from 'react-native-vector-icons/Feather'
import type { ChemiReviewListType } from '../ProfileScreen'
import { authRequest } from '@/api/authRequest'
import CustomText from '@/common/components/CustomText'
import FlexDirectionWrapper from '@/common/components/FlexDirectionWrapper'
const { getUserChemi } = authRequest
interface ChemiReviewProps {
  review: ChemiReviewListType
}
const ChemiReview = ({ review }: ChemiReviewProps) => {
  useEffect(() => {
    const res = getUserChemi()
    console.log(res)
  }, [])
  return (
    <FlexDirectionWrapper mb={20} alignItems="center">
      <UsersIcon name={review.iconName} size={20} style={{ marginRight: 10 }} />
      <CustomText fontWeight={600}>{String(review.reviewCount)}</CustomText>
      <FlexDirectionWrapper backgroundColor="gray200" pl={20} pr={20} pb={10} pt={10} ml={10} borderRadius={10}>
        <CustomText>{review.reviewTxt}</CustomText>
      </FlexDirectionWrapper>
    </FlexDirectionWrapper>
  )
}

export default ChemiReview
