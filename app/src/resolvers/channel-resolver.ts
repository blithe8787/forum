import { Channel } from './../entities/channel';
import { Resolver, Query, FieldResolver, Arg, Root, Mutation, Ctx, Int } from "type-graphql";
import { getRepository, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { ChannelInput } from "./types/channel-input";

@Resolver(of => Channel)
export class ChannelResolver {
    constructor(
        @InjectRepository(Channel) private readonly channelRepository: Repository<Channel>,
    ) {
        this.channelRepository = getRepository(Channel)
    }


    @Query(returns => [Channel], { nullable: true })
    channels(): Promise<Channel[]> {
        return this.channelRepository
            .createQueryBuilder("channel")
            .orderBy("id")
            .getMany();
    }

    @Mutation(returns => Channel)
    async createChannel(
        @Arg("channelInput") { name }: ChannelInput
    ): Promise<Channel> {
        const channel = this.channelRepository.create({
            name: name
        });
        await this.channelRepository.save(channel);
        return channel;
    }
}