import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'
import { IdField } from '../../utilities/enum'

@Entity({ name: 'insider_roles' })
export class InsiderRole {

    @PrimaryGeneratedColumn({ name: IdField.InsiderRole })
    id: number

    @Index('insider_role_name_index')
    @Column({ name: 'name' })
    name: string
}