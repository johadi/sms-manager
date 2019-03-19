import * as express from 'express';
import * as Validator from 'validatorjs';
import db = require('../../database/models');
import {handleError, handleSuccess} from "../helpers/helpers";
import {Op} from "sequelize";



export class Contact {
  static add(req: express.Request, res: express.Response) {
    const validator = new Validator(req.body, db.Contact.createRules());
    if (validator.fails()) {
      return handleError({code: 400, message: validator.errors.all()}, res);
    }

    return db.Contact.findOrCreate({where: {phoneNumber: req.body.phoneNumber}, defaults: req.body})
      .then(([contact, created]: any[]) => {
        if (!created) {
          return Promise.reject({code: 409, message: 'This contact already exists'});
        }

        return handleSuccess({code: 201, data: contact}, res);
      })
      .catch((err: any) => handleError(err, res));
  }

  static get(req: express.Request, res: express.Response) {
    if (!req.params.phoneNumber) {
      return Promise.reject({code: 400, message: 'Parameter phoneNumber is required'});
    }

    return db.Contact.findOne({where: { phoneNumber: req.params.phoneNumber }})
      .then((contact: any) => {
        if (!contact) {
          return Promise.reject({code: 404, message: 'Contact not found'});
        }

        return handleSuccess({code: 200, data: contact}, res);
      })
      .catch((err: any) => handleError(err, res));
  }

  static update(req: express.Request, res: express.Response) {
    if (!req.params.phoneNumber) {
      return Promise.reject({code: 400, message: 'Parameter phoneNumber is required'});
    }

    return db.Contact.findOne({where: { phoneNumber: req.params.phoneNumber }})
      .then((contact: any) => {
        if (!contact) {
          return Promise.reject({code: 404, message: 'Contact not found'});
        }

        return contact.update(req.body);
      })
      .then((updatedContact: any) => handleSuccess({code: 200, data: updatedContact}, res))
      .catch((err: any) => handleError(err, res));
  }

  static getAll(req: express.Request, res: express.Response) {
    if (!req.params.phoneNumber) {
      return Promise.reject({code: 400, message: 'Parameter phoneNumber is required'});
    }

    const phoneNumber = req.params.phoneNumber;

    return db.Contact.findOne({ where: { phoneNumber } })
      .then((contact: any) => {
        if (!contact) {
          return Promise.reject({code: 404, message: 'Contact not found'});
        }

        return db.Message.findAll({where: { [Op.or]: [{senderId: phoneNumber}, {receiverId: phoneNumber}] }})
      })
      .then((messages: any[]) => {
        if (messages.length === 0) {
          return Promise.reject({code: 404, message: 'No messages found for this contact'});
        }

        return handleSuccess({code: 200, data: messages}, res);
      })
      .catch((err: any) => handleError(err, res));
  }

  static getAllMessagesSentByContact(req: express.Request, res: express.Response) {
    if (!req.params.phoneNumber) {
      return Promise.reject({code: 400, message: 'Parameter phoneNumber is required'});
    }

    return db.Contact.findOne({where: { phoneNumber: req.params.phoneNumber }})
      .then((contact: any) => {
        if (!contact) {
          return Promise.reject({code: 404, message: 'Contact not found'});
        }

        return db.Message.findAll({where: { senderId: req.params.phoneNumber }});
      })
      .then((messages: any[]) => {
        if (messages.length === 0) {
          return Promise.reject({code: 404, message: 'No messages sent by this contact'});
        }

        return handleSuccess({code: 200, data: messages}, res);
      })
      .catch((err: any) => handleError(err, res));
  }

  static getAllMessagesReceivedByContact(req: express.Request, res: express.Response) {
    if (!req.params.phoneNumber) {
      return Promise.reject({code: 400, message: 'Parameter phoneNumber is required'});
    }

    return db.Contact.findOne({where: { phoneNumber: req.params.phoneNumber }})
      .then((contact: any) => {
        if (!contact) {
          return Promise.reject({code: 404, message: 'Contact not found'});
        }

        return db.Message.findAll({where: { receiverId: req.params.phoneNumber }});
      })
      .then((messages: any[]) => {
        if (messages.length === 0) {
          return Promise.reject({code: 404, message: 'No messages received by this contact'});
        }

        return handleSuccess({code: 200, data: messages}, res);
      })
      .catch((err: any) => handleError(err, res));
  }

  static delete(req: express.Request, res: express.Response) {
    if (!req.params.phoneNumber) {
      return Promise.reject({code: 400, message: 'Parameter phoneNumber is required'});
    }

    return db.Contact.findOne({where: { phoneNumber: req.params.phoneNumber }})
      .then((contact: any) => {
        if (!contact) {
          return Promise.reject({code: 404, message: 'Contact not found'});
        }

        return contact.destroy();
      })
      .then(() => handleSuccess({code: 200, data: 'Contact deleted'}, res))
      .catch((err: any) => handleError(err, res));
  }
}