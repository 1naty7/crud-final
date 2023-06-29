import Express from "express";
import mongoose from "mongoose";
import eventModel from "../models/event.model";
import { body } from "express-validator";
var jwt = require("jwt-simple");
import { decode } from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });
const SECRET_KEY = process.env.SECRET_KEY;

export const getEvent = async (req: Express.Request, res: Express.Response) => {
	try {
		let tokenJWT;
		if (req.headers.authorization) {
			tokenJWT = req.headers.authorization.split(" ").pop();
		}
		var decoded = jwt.decode(tokenJWT, SECRET_KEY);
		console.log(decoded);
		let events: any = [];
		if (decoded.user._id) {
			const result = await eventModel.find({author:decoded.user._id});
      res.status(200).json({ result });
		}
	} catch (error) {
		console.log(error);
		return res.status(400).json({ msg: "ha ocurrido un error", error });
	}
};

export const createEvent = async (
	req: Express.Request,
	res: Express.Response
) => {
	try {
		let tokenJWT;
		if (req.headers.authorization) {
			tokenJWT = req.headers.authorization.split(" ").pop();
		}
		var decoded = jwt.decode(tokenJWT, SECRET_KEY);
		console.log(decoded);
		if (decoded.user._id) {
			// const tasks = await TaskModel.find({author:decoded.user._id}).populate("image")
      
			let newEvent = req.body;
      newEvent.author = decoded.user._id
			const eventCreated = await eventModel.create(newEvent);
			if (eventCreated)
				return res.status(201).json({ msg: "Evento Creado" });
		}

		throw { msg: "Error al crear el evento" };
	} catch (error) {
		console.log(error);
		return res.status(400).json({ msg: "ha ocurrido un error", error });
	}
};

export const updateEvent = async (
	req: Express.Request,
	res: Express.Response
) => {
	// {
	//   _id:
	//   dataToUpdate: {}
	// }

	try {
		let dataToUpdate = req.body.dataToUpdate;
		let title = req.body.title;
		console.log(title);
		const updatedData = await eventModel.findOneAndUpdate(
			{ title: title },
			dataToUpdate
		);
		console.log(updatedData);
		return res.status(204).json({ msg: "Evento actualizado" });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ msg: "ha ocurrido un error", error });
	}
};

export const deleteEvent = async (
	req: Express.Request,
	res: Express.Response
) => {
	try {
		let title = req.params.title;
		const deleted = await eventModel.findOneAndDelete({ title: title });
		console.log(deleted);
		return res.status(200).json({ msg: "Evento ELiminado" });
	} catch (error) {
		return res.status(400).json({ msg: "ha ocurrido un error", error });
	}
};
