import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'

import { Role } from './role'

@Entity({ name: 'insiders' })
export class Insider {

    @PrimaryGeneratedColumn({ name: 'insider_id' })
    id: number

    @Column({ name: 'swr_email' })
    swrEmail: string

    @Column({ name: 'name' })
    name: string

    @Column({ name: 'avatar_url' })
    avatarUrl: string

    @ManyToOne(() => Role)
    @JoinColumn({ name: 'role_id' })
    role: Role
}
