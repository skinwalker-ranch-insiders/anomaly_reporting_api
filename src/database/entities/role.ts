import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({
    name: 'roles'
})
export class Role {

    @PrimaryGeneratedColumn({
        name: 'role_id'
    })
    id: number

    @Column({
        name: 'name'
    })
    name: string
}