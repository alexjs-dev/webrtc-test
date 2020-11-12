const offer = {""} // SDP from a

// Creating a remote connection
const remoteConnection = new RTCPeerConnection()


// Every time we get ice candidate reprint SDP
// Will be called multiple times
remoteConnection.onicecandidate = e => console.log(`SDP: ${JSON.stringify(remoteConnection.localDescription)}`)

remoteConnection.ondatachannel = e => {
  // getting a remote channel, and we need to save that channel
  remoteConnection.dc = e.channel // creating a new variable dc, assigning to received channel
  remoteConnection.dc.onmessage = e => console.log(`Message received: ${e.data}`)
  remoteConnection.dc.onopen = e => console.log('Connection established')
}
remoteConnection.setRemoteDescription(offer).then(() => console.log('Offer set'))

remoteConnection.createAnswer().then(answer => remoteConnection.setLocalDescription(answer)).then(() => console.log('Answer created')) // triggers onicecandidate

// Last step

remoteConnection.dc.send("Test")