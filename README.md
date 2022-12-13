### Prototype

This prototype represents an architecture outline for a swapping feature. The application connects to a redis instance via redis pub/sub streams
and listens for specific keyspace changes. Any observed redis events are handled by custom message handlers which forward said events to a server-side gRPC
stream for subscribed clients.

### Running

Ensure to have proto files generated via:

`yarn proto:gen`

Aftewards, adjust the `.env` for redis url and gRPC port. You can start the server via:

`yarn dev:server`

and a number of clients via:

`yarn dev:client`

### Redis Config

To enable pub/sub keyspace change events I've set the following redis config which will allow to subscribe to events.
`CONFIG GET "notify-keyspace-events"`

Setting:
`"AKE"`
