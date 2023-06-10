import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routers from './app/routes';
// import { UsersRouter } from './app/modules/user/user.route';
// import { AcademicSemesterRouters } from './app/modules/academicSemester/academicSemester.route';
// import { Promise } from 'mongoose'

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Application routes
// console.log(app.get('env'))

// app.use('/api/v1/users', UsersRouter);
// app.use('/api/v1/academic-semesters', AcademicSemesterRouters);

app.use('/api/v1/', routers);

//Test
// app.get('/',async(req: Request, res: Response, next: NextFunction) => {
// throw new Error ('testing eror logger')
// })
//global error handler
app.use(globalErrorHandler);

export default app;
