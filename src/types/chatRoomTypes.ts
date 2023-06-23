export interface Message {
  key: string
  createdAt: Date
  message: string
  roomId: string
  userId: string
}

export interface ChatRoomProps {
  roomId: string
  createdAt: string
  matchingId: string
  user: [string, string]
  messages: Message[]
}

export const tempDefaultMessages: Message[] = [
  {
    key: '1',
    createdAt: new Date(),
    message: '안녕하세요',
    roomId: '1',
    userId: '1',
  },
  {
    key: '2',
    createdAt: new Date(),
    message: '안녕하세요',
    roomId: '1',
    userId: '2',
  },
  {
    key: '3',
    createdAt: new Date(),
    message: '안녕하세요',
    roomId: '1',
    userId: '1',
  },
  {
    key: '4',
    createdAt: new Date(),
    message: '안녕하세요',
    roomId: '1',
    userId: '2',
  },
  {
    key: '5',
    createdAt: new Date(),

    message: '안녕하세요',
    roomId: '1',
    userId: '1',
  },
  {
    key: '6',
    createdAt: new Date(),
    message: '안녕하세요',
    roomId: '1',
    userId: '2',
  },
]
