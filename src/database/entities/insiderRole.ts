import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({
    name: 'roles'
})
export class InsiderRole {

    @PrimaryGeneratedColumn({
        name: 'role_id'
    })
    id: number

    @Column({
        name: 'name'
    })
    name: string
}