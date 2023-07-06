import { BASE_URL } from '@env'
import { createContext } from 'react'
import { io, Socket } from 'socket.io-client'

const SOCKET_URL = `${BASE_URL}/match`

export const socket = io(SOCKET_URL)
export const SocketContext = createContext<Socket>(socket)
