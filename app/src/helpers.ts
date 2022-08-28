import { getRepository } from "typeorm";

import { Channel } from "./entities/channel";
import { Message } from "./entities/message";

export async function seedDatabase() {
  const channelRepository = getRepository(Channel);
  const messageRepository = getRepository(Message);

  const chlCount = await channelRepository.count();
  if (chlCount < 1) {
    let chls = []
    for (let i = 0; i < 10; i++) {
      chls.push({ name: "Channel " + (i + 1) })
    }

    const channels = channelRepository.create(chls);
    await channelRepository.save(channels)
  }
  const mgsCount = await messageRepository.count();
  if (mgsCount < 1) {
    let mgs = []
    for (let i = 0; i < 200; i++) {
      const date = new Date
      mgs.push(
        {
          title: "Message " + (i + 1),
          content: "Message content.",
          channelId: Math.floor(Math.random() * 10 + 1),
          createdAt: date.toISOString()
        }
      )
    }
    const messages = messageRepository.create(mgs);
    await messageRepository.save(messages)
  }
}
