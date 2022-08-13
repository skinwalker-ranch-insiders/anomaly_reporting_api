import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { InsiderRole } from './insiderRole'

@Entity({ name: 'insiders' })
export class Insider {

    @PrimaryGeneratedColumn({ name: 'insider_id' })
    id: number

    @Index('insider_email_index')
    @Column({ name: 'email' })
    email: string

    @Column({ name: 'name' })
    name: string

    @Column({ name: 'avatar_url' })
    avatarUrl: string

    @ManyToOne(() => InsiderRole)
    @JoinColumn({ name: 'insider_role_id' })
    role: InsiderRole
}
