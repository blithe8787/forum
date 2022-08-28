import { Channel } from "../../entities/channel"
import { Field, InputType } from "type-graphql"
import { Length } from "class-validator";

@InputType()
export class ChannelInput implements Partial<Channel> {
  @Field()
  @Length(1, 255)
  name: string
}