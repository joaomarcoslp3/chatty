import { Router } from 'express'
import { SettingsController } from './controllers/SettingsController'

const routes = Router()
const settingsController = new SettingsController()

routes.get('/', (req, res) => {
  return res.send('Server Working')
})

routes.post('/settings', settingsController.create)

export { routes }
