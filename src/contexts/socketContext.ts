import { createContext } from 'react'
import { io, Socket } from 'socket.io-client'

const SOCKET_URL = 'http://10.0.2.2:4000'

export const socket = io(SOCKET_URL)
export const SocketContext = createContext<Socket>(socket)
