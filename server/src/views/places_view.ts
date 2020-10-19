import PlacesToDate from '../models/placesToDate'
import imagesView from './images_view'
export default {
    render(place: PlacesToDate){
        
        return {
            name: place.name,
            latitude: place.latitude,
            longitude: place.longitude,
            about: place.about,
            whatsapp: place.whatsapp,
            howToArrive: place.howToArrive,
            open_on_weekends: place.open_on_weekends,
            id: place.id,
            images: imagesView.renderMany(place.images)
        }
    },

    renderMany(places: PlacesToDate[]) {
        return places.map(place => this.render(place))
    }
}