import { Request, Response }  from 'express'
import { getRepository } from 'typeorm'
import PlacesToDate from '../models/placesToDate'
import placesView from '../views/places_view'
import * as Yup from 'yup'

export default {
    async index(request: Request, response: Response){
        const placesRepository = getRepository(PlacesToDate)

        const places = await placesRepository.find({
            relations: ['images']
        })

        return response.json(placesView.renderMany(places))
    }, 
    async show(request: Request, response: Response){
        const { id } = request.params

        const placesRepository = getRepository(PlacesToDate)
       
        const place = await placesRepository.findOneOrFail(id, {
            relations: ['images']
        })

        return response.json(placesView.render(place))
    },    
    async create(request: Request, response: Response){

        const {
            name,
            latitude,
            longitude,
            about,
            howToArrive,
            open_on_weekends
        } = request.body
       
        const placesRepository = getRepository(PlacesToDate)

        const requestImages = request.files as Express.Multer.File[]
         
        const images = requestImages.map(image =>{
             return { path: image.filename}
         })
       
        const data = {
            name,
            latitude,
            longitude,
            about,
            howToArrive,
            open_on_weekends: open_on_weekends === true,
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            howToArrive: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: 
                Yup.array(Yup.object().shape({
                    path: Yup.string().required()
                }
            ))
        })

        const finalData = schema.cast(data)

        await schema.validate(data, {
            abortEarly: false,
            
        })

        const places = placesRepository.create(data)
       
        await placesRepository.save(places)
       
        return response.status(201).json(places)
    }
}