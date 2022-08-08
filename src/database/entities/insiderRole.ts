import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({ name: 'insider_roles' })
export class InsiderRole {

    @PrimaryGeneratedColumn({ name: 'insider_role_id' })
    id: number

    @Column({
        name: 'name'
    })
    name: string
}