/*
** Copyright 2b2dev - All Rights Reserved
** Unauthorized copying of this file, via any medium is strictly prohibited
** Proprietary and confidential
** Written by Alexandre Chetrit <alexandre.chetrit@epitech.eu>
*/

import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column
} from 'typeorm'

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
    id!: string

  @Column({ length: 32 })
    salt!: string

  @Column({ length: 32 })
    email!: string

  @Column('uuid', { nullable: true, default: null })
    passwordResetToken?: string

  @Column({ nullable: true, default: null })
    passwordResetExpiration?: Date

  @Column('bigint', { nullable: true, default: null })
    passwordResetPassword?: number

  @Column('boolean', { default: false })
    isVerified: boolean = false

  @Column({ length: 64 })
    password!: string

  @Column({ length: 32, nullable: true })
    firstName?: string

  @Column({ length: 32, nullable: true })
    lastName?: string

  @Column('date', { nullable: true })
    bornDate?: Date

  @CreateDateColumn()
    createdDate!: Date

  @UpdateDateColumn()
    modifiedDate!: Date
}
