import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({ name: 'case_types' })
export class CaseType {

    @PrimaryGeneratedColumn({ name: 'case_type_id' })
    id: number

    @Column({ name: 'name' })
    name: string

    @Column({ name: 'description' })
    description: string
}