socket = io.connect();
socket.on('connect', function socketConnected() {
  /* Dev-ONLY!!!! */
  /*socket.get('/firehose', function nowListeningToFirehose () {
    socket.on('firehose', function newMessageFromSails ( message ) {
      console.log('FIREHOSE (debug): Sails published a message ::\n', message);
    });
  });  */
});