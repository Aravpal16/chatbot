mport React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

export default class App extends React.Component {
  state = {
    messages: [],
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Welcome',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Watson Assistant',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    console.log("messages "+ messages);
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
      connectWatson();
    }));
  }

 connectWatson(){
 
    fetch("https://us-south.functions.cloud.ibm.com/api/v1/web/Paz%20Org_dev/default/inventoryapi.json", {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: messages[0],
      
    }),
  }).then((response) => response.json())
      .then((responseJson) => {

        this.setState((previousState) => {
          return {
            messages: GiftedChat.append(previousState.messages, {
              _id: Math.round(Math.random() * 1000000),
              text: text,
              createdAt: new Date(),
              user:{
                _id:2,
                name:"Watson Assistant"
              },
            }),
          }
      })
      .catch((error) => {
        console.error(error);
      });

      })

 }
  

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}