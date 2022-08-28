import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, RelationId, JoinColumn } from "typeorm";
import { Field, ObjectType, ID } from "type-graphql";
import { Channel } from "./channel";

@ObjectType()
@Entity()
export class Message {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number

  @Field()
  @Column({ type: "varchar", length: 255 })
  title: string

  @Field()
  @Column("text")
  content: string

  @Field(type => Channel)
  @ManyToOne(type => Channel)
  channel: Channel;
  @Column("int")
  @Field()
  @RelationId((message: Message) => message.channel)
  channelId: number

  @Field()
  @Column("timestamp")
  createdAt: string
}

