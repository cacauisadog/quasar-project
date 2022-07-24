import { createServer, Model } from 'miragejs'

export default function () {
  createServer({
    models: {
      task: Model,
    },

    seeds(server) {
      server.create('task', { text: 'Wash the dog', isDone: true })
      server.create('task', { text: 'Walk the dishes', isDone: false })
      server.create('task', { text: 'Feed the cat', isDone: true })
    },

    routes() {
      this.namespace = 'api'
      this.urlPrefix = 'http://localhost:9000'

      this.get('/tasks')
      this.patch('/tasks/:id', (schema, request) => {
        const id = request.params.id
        const attrs = JSON.parse(request.requestBody)
        schema.tasks.find(id).update(attrs)
      })
    },
  })
}
