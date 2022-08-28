# How to install

### In the dev environment  
  - install mysql.  
  - change your mysql configure file "ormconfig.json".  
  - go to the APP folder and run "yarn && yarn start".  
### In the product environment  
  - install docker and docker-compose.
  - execute the command "docker-compose up -d" in the root directory.
  - open "http://localhost:4000/" in browser and test api.

# How to run uni-test  
 go to the APP folder and run "yarn && yarn test".  


# Test Api 
open "http://localhost:4000/" in browser.   
enter the following code in the left area and execute.  

      

## Test code
### List all channel
```
{
    channels{
        id
        name
    }
}
```

### List message
```
{
    messages(channelId:1){
        id
        title
        content
        channel{
          id
          name
        }
        createdAt
    }
}
```

### Pagination
```
{
 messages(channelId:1, page:1){
      id
      title
      content
      channel{
        id
        name
      }
      createdAt
  }
}
```

### Create a channel.
```
mutation {
  createChannel(channelInput: { name: "channel 1" }) {
    id
    name
  }
}
```

### Create a message.
```
mutation {
  writeMessage(messageInput: { title: "message 12", channelId:1, content:"message content" }) {
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
```