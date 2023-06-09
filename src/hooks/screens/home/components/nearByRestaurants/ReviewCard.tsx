import React from 'react'
import StarRating from 'react-native-star-rating'
import * as S from './ReviewCard.style'
import theme from '@/common/style/theme'

export interface Review {
  author_name: string
  rating: number
  relative_time_description: string
  time: number
  author_url?: string
  language?: string
  original_language?: string
  profile_photo_url?: string
  text?: string
  translated?: boolean
}

interface ReviewCardProps {
  review: Review
}

const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <S.ReviewCardLayout>
      <S.AuthorRow>
        <S.AvatarWrapper>
          <S.Avatar style={{ width: 42, height: 42 }} source={{ uri: review.profile_photo_url }} resizeMode={'cover'} />
        </S.AvatarWrapper>
        <S.AuthorInfo>
          <S.AuthorName>{review.author_name}</S.AuthorName>
          <StarRating
            rating={review.rating}
            fullStarColor={theme.colors.primary}
            halfStarEnabled
            halfStarColor={theme.colors.primary}
            starSize={16}
          />
        </S.AuthorInfo>
      </S.AuthorRow>
      <S.TextWrapper>
        <S.Text>{review.text && review.text}</S.Text>
      </S.TextWrapper>
    </S.ReviewCardLayout>
  )
}

export default ReviewCard
