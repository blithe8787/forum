import { Message } from '../entities/message';
import { Channel } from '../entities/channel';
import { Resolver, Query, FieldResolver, Arg, Root, Mutation, Ctx, Int } from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { MessageInput } from "./types/message-input";

@Resolver(of => Message)
export class MessageResolver {
    constructor(
        @InjectRepository(Channel) private readonly channelRepository: Repository<Channel>,
        @InjectRepository(Message) private readonly messageRepository: Repository<Message>,
    ) { }

    @Query(returns => [Message], { nullable: true })
    messages(
        @Arg("channelId", type => Int) channelId: number,
        @Arg("page", type => Int, { nullable: true, defaultValue: 1 }) page: number
    ): Promise<Message[]> {
        const pageSize = 5
        return this.messageRepository
            .createQueryBuilder("message")
            .where("message.channelId = :channelId", { channelId: channelId })
            .skip((page - 1) * pageSize)
            .take(page * pageSize)
            .orderBy('createdAt', 'DESC')
            .getMany();
    }

    @FieldResolver()
    async channel(@Root() message: Message): Promise<Channel> {
        // console.log(message)
        return (await this.channelRepository.findOne(message.channelId, { cache: 1000 }))!;
    }

    @Mutation(returns => Message)
    async writeMessage(
        @Arg("messageInput") messageInput: MessageInput
    ): Promise<Message> {
        const date = new Date()
        const message = this.messageRepository.create({
            ...messageInput,
            createdAt: date.toISOString()
        });
        await this.messageRepository.save(message)
        return message;
    }
}