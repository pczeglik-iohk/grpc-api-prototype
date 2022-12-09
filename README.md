### Prototype

Listens to redis instance for order and liquidity changes.

### Redis Config

To enable keyspace events I've set the following redis config which will allow to subscribe to events.

`CONFIG GET "notify-keyspace-events"`

Setting:
`"AKE"`
