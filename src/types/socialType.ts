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

export interface ImageData {
  uri: string | undefined;
}