import * as express from 'express';
import * as Validator from 'validatorjs';
import db = require('../../database/models');
import { handleError, handleSuccess } from "../helpers/helpers";

export class Message {
  /**
   * Method that adds new message
   * @method signup
   * @param {object} req - request parameter
   * @param {object} res - response parameter
   * @return {object} response detail
   */
  static add(req: express.Request, res: express.Response) {
    const validator = new Validator(req.body, db.Message.createRules());
    if (validator.fails()) {
      return handleError({code: 400, message: validator.errors.all()}, res);
    }

    return db.Message.create(req.body, {fields: ['senderId', 'receiverId', 'body']})
      .then((message: any) => {
        if (!message) {
          return Promise.reject({code: 500, message: 'Something went wrong!'});
        }

        return handleSuccess({code: 201, data: message}, res);
      })
      .catch((err: any) => handleError(err, res));
  }

  /**
   * Method that gets a message details based on Id
   * @method get
   * @param {object} req - request parameter
   * @param {object} res - response parameter
   * @return {object} response detail
   */
  static get(req: express.Request, res: express.Response) {
    if (!req.params.messageId) {
      return Promise.reject({code: 400, message: 'Parameter messageId is required'});
    }

    return db.Message.findOne({where: { id: req.params.messageId }})
      .then((message: any) => {
        if (!message) {
          return Promise.reject({code: 404, message: 'Message not found'});
        }

        return handleSuccess({code: 200, data: message}, res);
      })
      .catch((err: any) => handleError(err, res));
  }

  /**
   * Method that updates a message details based on Id
   * @method update
   * @param {object} req - request parameter
   * @param {object} res - response parameter
   * @return {object} response detail
   */
  static update(req: express.Request, res: express.Response) {
    if (!req.params.messageId) {
      return Promise.reject({code: 400, message: 'Parameter messageId is required'});
    }

    return db.Message.findOne({where: { id: req.params.messageId }})
      .then((message: any) => {
        if (!message) {
          return Promise.reject({code: 404, message: 'Message not found'});
        }

        return message.update(req.body);
      })
      .then((updatedMessage: any) => handleSuccess({code: 200, data: updatedMessage}, res))
      .catch((err: any) => handleError(err, res));
  }

  /**
   * Method that deletes a message based on Id
   * @method delete
   * @param {object} req - request parameter
   * @param {object} res - response parameter
   * @return {object} response detail
   */
  static delete(req: express.Request, res: express.Response) {
    if (!req.params.messageId) {
      return Promise.reject({code: 400, message: 'Parameter messageId is required'});
    }

    return db.Message.findOne({where: { id: req.params.messageId }})
      .then((message: any) => {
        if (!message) {
          return Promise.reject({code: 404, message: 'Message not found'});
        }

        return message.destroy();
      })
      .then(() => handleSuccess({code: 200, data: 'Message deleted'}, res))
      .catch((err: any) => handleError(err, res));
  }
}