
// Creating a local connection
const localConnection = new RTCPeerConnection()
// Creating a data channel for webRTC, when the name of that channel
const dataChannel = localConnection.createDataChannel("channel")

// Subscribing to important events
dataChannel.onmessage = e => console.log(`Message received: ${e.data}`)
dataChannel.onopen = e => console.log('Connection established')

// Every time we get ice candidate reprint SDP
// Will be called multiple times
localConnection.onicecandidate = e => console.log(`SDP: ${JSON.stringify(localConnection.localDescription)}`)
// Creating an offer
localConnection.createOffer().then(offer => localConnection.setLocalDescription(offer)).then(() => console.log('SDP updated'))



// Last step (after b)
const answer = {""}
localConnection.setRemoteDescription(answer)


dataChannel.send("Hello world")
