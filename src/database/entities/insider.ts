import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { InsiderRole } from './insiderRole'
import { IdField } from '../../utilities/enum'

@Entity({ name: 'insiders' })
export class Insider {

    @PrimaryGeneratedColumn({ name: IdField.Insider })
    id: number

    @Index('insider_email_index')
    @Column({ name: 'email' })
    email: string

    @Column({ name: 'name' })
    name: string

    @Column({ name: 'avatar_url' })
    avatarUrl: string

    @ManyToOne(() => InsiderRole)
    @JoinColumn({ name: IdField.InsiderRole })
    role: InsiderRole
}
