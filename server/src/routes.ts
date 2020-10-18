import { Router }  from 'express'
import multer from 'multer'
import uploadConfig from './config/upload'
import PlacesController from './controllers/PlacesController'

const routes = Router()
const upload = multer(uploadConfig)
routes.get('/placesToDate', PlacesController.index)
routes.get('/placesToDate/:id', PlacesController.show)

routes.post('/placesToDate', upload.array('images'),PlacesController.create)

export default routes