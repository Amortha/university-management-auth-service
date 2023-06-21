"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_status_1 = __importDefault(require("http-status"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const routes_1 = __importDefault(require("./app/routes"));
// import { UsersRouter } from './app/modules/user/user.route';
// import { AcademicSemesterRouters } from './app/modules/academicSemester/academicSemester.route';
// import { Promise } from 'mongoose'
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
//parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//Application routes
// console.log(app.get('env'))
// app.use('/api/v1/users', UsersRouter);
// app.use('/api/v1/academic-semesters', AcademicSemesterRouters);
app.use('/api/v1/', routes_1.default);
//Test
// app.get('/',async(req: Request, res: Response, next: NextFunction) => {
// throw new Error ('testing eror logger')
// })
//global error handler
app.use(globalErrorHandler_1.default);
//handle not found
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found',
            },
        ],
    });
    next();
});
exports.default = app;
