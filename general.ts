import {Request, Response} from "express";

export interface IRequest<T> extends Request<{}, {}, T, {}> {
  body: T
}

export interface IResponse<T> extends Response<T> {
  body: T
}

export interface IMessage {
  message: string
}