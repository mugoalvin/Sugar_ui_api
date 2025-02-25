import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm"

@Entity()
export class Sugar {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    image: string

    @Column()
    productName: string

    @Column()
    size: string

    @Column()
    price: number

    @Column()
    originalPrice: number

    @Column()
    discount: number

    @Column()
    webLink: string

    @Column()
    country: string

    @Column()
    timestamp: string
}