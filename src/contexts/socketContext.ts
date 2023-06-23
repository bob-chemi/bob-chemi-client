import { createContext } from 'react'
import { io, Socket } from 'socket.io-client'

const SOCKET_URL = 'http://localhost:4000'

export const socket = io(SOCKET_URL)
export const SocketContext = createContext<Socket>(socket)
