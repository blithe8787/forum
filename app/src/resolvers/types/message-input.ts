import { Message } from "../../entities/message"
import { Field, InputType } from "type-graphql"
import { Length, IsInt, Min } from "class-validator";

@InputType()
export class MessageInput implements Partial<Message> {
  @Field()
  @Length(1, 255)
  title: string

  @Field()
  @IsInt()
  @Min(1)
  channelId: number

  @Field()
  content: string
}