import { createContext } from 'react'
import { io, Socket } from 'socket.io-client'

const SOCKET_URL = 'https://itchy-windows-watch.loca.lt/match'

export const socket = io(SOCKET_URL)
export const SocketContext = createContext<Socket>(socket)
