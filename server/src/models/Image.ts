import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import Places from './placesToDate'

@Entity('image')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    path: string

    @ManyToOne(() => Places, places => places.images)
    @JoinColumn({ name: 'places_id' })
    places: Places
}