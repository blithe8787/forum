import { Connection, getRepository } from "typeorm";
import { gCall } from "../test-utils/gCall";
import { testConn } from "../test-utils/testConn";
import { ChannelInput } from "../resolvers/types/channel-input";
import { Channel } from "../entities/channel";

let conn: Connection;
beforeAll(async () => {
    conn = await testConn();

});
afterAll(async () => {
    await conn.close();
});

const createChannelMutation = `
mutation createChannel($channelInput: ChannelInput!) {
    createChannel(channelInput: $channelInput) {
      id
      name
    }
}
  `;

describe("Channel", () => {
    it.only("create channel", async () => {
        const channel = { name: "channel " + (Math.round(Math.random() * 1000) + 100) }
        const response = await gCall({
            source: createChannelMutation,
            variableValues: {
                channelInput: channel
            }
        });

        if (response.errors) {
            console.log(response.errors[0]);
        }
        // console.log(response);
        expect(response).toMatchObject({
            data: {
                createChannel: {
                    name: channel.name
                }
            }
        });

        const channelRepository = getRepository(Channel)
        const cls = await channelRepository.findOne({ where: { name: channel.name } });
        // console.log(cls)
        expect(cls).toMatchObject({
            name: channel.name
        });
    });
});