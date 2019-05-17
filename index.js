const express = require('express')
const cors = require('cors')
const app = express()

const bodyParser = require('body-parser')
 
app.use(cors())
app.use(bodyParser.json())

let exercises = [
    {
      id: 1,
      description: 'Running',
      date: '2017-12-10T17:30:31.098Z',
      category: '',
    },
    {
      id: 2,
      description: 'Cycling',
      date: '2017-12-10T17:30:31.098Z',
      category: '',
    },
    {
      id: 3,
      description: 'Walking ',
      date: '2017-12-10T17:30:31.098Z',
      category: '',
    },
  ]


  app.get('/exercises', (req,res) => {
      res.json(exercises)
  })

  app.get('/exercises/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const exercise = exercises.find(exercise => exercise.id === id)
    console.log('Get one exercise')     
    response.json(exercise)
  })

  app.delete('/exercises/:id', (request, response) => {
    const id = Number(request.params.id);
    exercises = exercises.filter(exercise => exercise.id !== id);
    console.log(`deleted exercise id: ${id}`)
  
    response.status(204).end();
  });

  const generateId = () => {
    const maxId = exercises.length>0 ? Math.max(...exercises.map(n => n.id)):0
    return maxId+1
  }

  app.post('/exercises', (request, response) => {
    const body = request.body
    
    if (!body.content){
        return response.status(400).json({
            error: 'content missing'
        })
    
    }

    const exercise = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId()
    }

    exercises.concat(exercise)
    exercises.join(exercise)
    console.log(exercise)
  
    response.json(exercises)
  })

  const PORT = 3001

  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
  })

