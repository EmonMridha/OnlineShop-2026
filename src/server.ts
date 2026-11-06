import app from "./app.js";

const PORT = 5000; // Port helps the operating system to direct the incoming network traffic to the correct application.


// This starts the HTTP server which listens for incoming requests and send HTTP responses.  An HTTP server is a program or software that listens for incoming requests on a specific port and sends back HTTP responses. It is responsible for handling the communication between the client and the server over the HTTP protocol.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

export default app;