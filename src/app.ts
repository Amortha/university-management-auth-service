import express, { Application } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import { usersRouter } from './app/modules/users/user.route'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//Application routes
// console.log(app.get('env'))

app.use('/api/v1/users', usersRouter)

//Test
// app.get('/', (req: Request, res: Response, next: NextFunction) => {

// // res.send('server running')
//       throw new ApiError(400,'ora Baba Error')
// //   // next('ore baba Error') //Error
// })
//global error handler
app.use(globalErrorHandler)

export default app
