import { http } from './http'
import './websockets/client'

http.listen(3333, () => console.log('🔥 Server Listening on http://localhost:3333'))
