import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({ name: 'conclusion_categories' })
export class ConclusionCategory {

    @PrimaryGeneratedColumn({ name: 'conclusion_category_id' })
    id: number

    @Column({ name: 'name' })
    name: string
}