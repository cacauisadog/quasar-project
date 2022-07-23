import { createServer } from 'miragejs'

export default function () {
  createServer({
    routes() {
      this.namespace = 'api'
      this.urlPrefix = 'http://localhost:9000'

      this.get('/tasks', () => {
        return [
          {
            id: 1,
            text: 'Wash the dog',
            isDone: true,
          },
          {
            id: 2,
            text: 'Walk the dishes',
            isDone: false,
          },
        ]
      })

      this.post('/tasks/:id', (schema, request) => {
        const taskId = request.params.id
        const attrs = JSON.parse(request.requestBody)

        return { id: taskId, text: 'Wash the dog', isDone: attrs.newStatus }
      })
    },
  })
}
