import { ImageSourcePropType } from "react-native";
import { User } from '@/types/userType';
import { StackParamList } from "@/navigations/StackNav";
import { TabParamList } from "@/navigations/BottomTabs";

export type ParamList = StackParamList & TabParamList;

export interface Group {
  groupId: number;
  title: string;
  description: string;
  groupDate: string;
  groupHour: number;
  groupMin: number;
  groupLocation: string;
  groupPeopleLimit: number;
  status: 'PUBLIC' | 'PRIVATE';
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  image: string;
  owner: User["user"];
}

export interface Member {
  memberId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  user: User;
  group: string;
}

export interface FoodieBoard {
  id: string;
  title: string;
  content: string;
  creadeAt: string;
  user: User["user"];
  images: FoodieImage
}

export interface GroupRequest {
  title: string;
  groupId: number;
  pendingUser: User["user"];
  MemberId: string;
}

export interface FoodieImage {
  id: string;
  url: string;
  // foodieBoard: {};
}

// export const groupRequestVirtualData: GroupRequest[] = [
//   {
//     title: "소모임모집합니다.",
//     pendingId: "user1",
//     groupId: 37
//   },
//   {
//     title: "소모임2",
//     pendingId: "user2",
//     groupId: 37
//   },
//   {
//     title: "소모임3",
//     pendingId: "user3",
//     groupId: 37
//   },
//   {
//     title: "소모임4",
//     pendingId: "user4",
//     groupId: 37
//   },
//   {
//     title: "소모임5",
//     pendingId: "user5",
//     groupId: 37
//   },
//   {
//     title: "소모임6",
//     pendingId: "user6",
//     groupId: 37
//   },
//   {
//     title: "소모임7",
//     pendingId: "user7",
//     groupId: 37
//   }
// ]

// export const foodieVirtualData: FoodieBoard[] = [
//   {
//     id: '1',
//     title: '서울 맛집 추천합니다.',
//     content: '서울 맛집 추천합니다~~',
//     createAt: '2023-06-18',
//     user: {
//       id: 'user1',
//       email: 'kjuhyun3343@gmail.com',
//       phone: '01020556053',
//       nickname: 'user1',
//       name: '김주현',
//       gender: 'Female',
//       age: 28,
//     },
//     images: {
//       id: '1',
//       url: '@assets/images/foodieImage.jpg'
//     }
//   },
//   {
//     id: '2',
//     title: '대전 맛집 추천합니다.',
//     content: '대전 맛집 추천합니다~~',
//     createAt: '2023-06-18',
//     user: {
//       email: 'kjuhyun3343@gmail.com',
//       password: '123456',
//       phone: '01020556053',
//       name: "김주현",
//       nickname: 'loopy',
//       gender: 'Female',
//       age: 28,
//     },
//     images: {
//       id: '1',
//       url: '@assets/images/foodieImage.jpg'
//     }
//   },
//   {
//     id: '3',
//     title: '인천 맛집 추천합니다.',
//     content: '인천 맛집 추천합니다~~',
//     createAt: '2023-06-18',
//     user: {
//       email: 'kjuhyun3343@gmail.com',
//       password: '123456',
//       phone: '01020556053',
//       name: "김주현",
//       nickname: 'loopy',
//       gender: 'Female',
//       age: 28,
//     },
//     images: {
//       id: '1',
//       url: '@assets/images/foodieImage.jpg'
//     }
//   },
//   {
//     id: '4',
//     title: '대구 맛집 추천합니다.',
//     content: '대구 맛집 추천합니다~~',
//     createAt: '2023-06-18',
//     user: {
//       email: 'kjuhyun3343@gmail.com',
//       password: '123456',
//       phone: '01020556053',
//       name: "김주현",
//       nickname: 'loopy',
//       gender: 'Female',
//       age: 28,
//     },
//     images: {
//       id: '1',
//       url: '@assets/images/foodieImage.jpg'
//     }
//   },
//   {
//     id: '5',
//     title: '부산 맛집 추천합니다.',
//     content: '부산 맛집 추천합니다~~',
//     createAt: '2023-06-18',
//     user: {
//       email: 'kjuhyun3343@gmail.com',
//       password: '123456',
//       phone: '01020556053',
//       name: "김주현",
//       nickname: 'loopy',
//       gender: 'Female',
//       age: 28,
//     },
//     images: {
//       id: '1',
//       url: '@assets/images/foodieImage.jpg'
//     }
//   },
//   {
//     id: '6',
//     title: '광주 맛집 추천합니다.',
//     content: '광주 맛집 추천합니다~~',
//     createAt: '2023-06-18',
//     user: {
//       email: 'kjuhyun3343@gmail.com',
//       password: '123456',
//       phone: '01020556053',
//       name: "김주현",
//       nickname: 'loopy',
//       gender: 'Female',
//       age: 28,
//     },
//     images: {
//       id: '1',
//       url: '@assets/images/foodieImage.jpg'
//     }
//   },
//   {
//     id: '7',
//     title: '제주 맛집 추천합니다.',
//     content: '제주 맛집 추천합니다~~',
//     createAt: '2023-06-18',
//     user: {
//       email: 'kjuhyun3343@gmail.com',
//       password: '123456',
//       phone: '01020556053',
//       name: "김주현",
//       nickname: 'loopy',
//       gender: 'Female',
//       age: 28,
//     },
//     images: {
//       id: '1',
//       url: '@assets/images/foodieImage.jpg'
//     }
//   },
// ]
