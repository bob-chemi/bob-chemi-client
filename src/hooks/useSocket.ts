import { useContext, useEffect } from 'react'
import { SocketContext } from '@/contexts/socketContext'

const useSocket = () => {
  const socket = useContext(SocketContext)

  useEffect(() => {
    socket.on('find_matching', data => console.log('매칭 등록 : ', data))
    socket.on('match_found', data => console.log('매칭됨!! ', data))

    socket.emit('test', '테스트중!!!')
  }, [socket])

  return socket
}

export default useSocket
