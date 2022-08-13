import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'insider_roles' })
export class InsiderRole {

    @PrimaryGeneratedColumn({ name: 'insider_role_id' })
    id: number

    @Index('insider_role_name_index')
    @Column({ name: 'name' })
    name: string
}