import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'
import image from './Image'

@Entity('placesToDate')
export default class PlacesToDate {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    name: string

    @Column()
    latitude: number
    
    @Column()
    longitude: number
   
    @Column()
    about: string

    @Column()
    howToArrive: string

    @Column()
    open_on_weekends: boolean

    @OneToMany(() => image, image => image.places, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'places_id' })
    images: image[]
}