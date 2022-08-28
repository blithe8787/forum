import { Connection, getRepository } from "typeorm";
import { gCall } from "../test-utils/gCall";
import { testConn } from "../test-utils/testConn";
import { Channel } from "../entities/channel";
import { Message } from "../entities/message";

let conn: Connection;
beforeAll(async () => {
    conn = await testConn();

});
afterAll(async () => {
    await conn.close();
});

const createMessageMutation = `
mutation writeMessage($messageInput: MessageInput!) {
    writeMessage(messageInput: $messageInput) {
        id
        title
        channel{
            id
            name
        }
        content
        createdAt
    }
}
  `;

describe("Message", () => {
    it.only("create message", async () => {
        const message = {
            title: "message " + (Math.round(Math.random() * 1000) + 100),
            content: "Message content.",
            channelId: Math.floor(Math.random() * 10 + 1)
        }
        const response = await gCall({
            source: createMessageMutation,
            variableValues: {
                messageInput: message
            }
        });

        if (response.errors) {
            console.log(response.errors);
        }
        // console.log(response);
        expect(response).toMatchObject({
            data: {
                writeMessage: {
                    title: message.title
                }
            }
        });

        const messageRepository = getRepository(Message)
        const cls = await messageRepository.findOne({ where: { title: message.title, channelId: message.channelId } });
        // console.log(cls)
        expect(cls).toMatchObject({
            title: message.title
        });
    });
});