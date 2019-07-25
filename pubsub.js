const PubNub = require('pubnub')

const credentials = {
    publishKey: 'pub-c-701d69a1-b1b2-4332-9d32-81606e0efbe6',
    subscribeKey: 'sub-c-3c9860ba-51ce-11e9-bacd-ba825bfe5cc2',
    secretKey: 'sec-c-ZDVhOTJkOTAtMjhjMi00ODczLWJmYTMtMGFkNTkyODMxNWQx'
};

const CHANNELS = {
    TEST: 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN'
};

class PubSub {
    constructor({ blockchain }){
        this.pubnub = new PubNub(credentials);
        this.blockchain = blockchain;
        this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
         this.pubnub.addListener(this.listener());
             
    }

    listener(){
        return {
            message: messageObject => {
                const { channel, message } = messageObject;

                console.log(`Message received. Channel: ${channel}. Message ${message}`);
                const parsedMessage = JSON.parse(message);

                if (channel === CHANNELS.BLOCKCHAIN){
                    this.blockchain.replaceChain(parsedMessage);
                }
            }
        };
    }

    publish({channel, message}){
        this.pubnub.unsubscribe(channel, () => {
            this.pubnub.publish({channel, message}, () => {
                this.pubnub.subscribe(channel);
            });
        }); 
    }

    broadcastChain(){
        this.publish({
            channel: CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain)
        });
    }
}


module.exports = PubSub;

