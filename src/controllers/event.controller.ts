import Express from "express";
import mongoose from "mongoose";
import eventModel from "../models/event.model";

export const getEvent = async (req: Express.Request, res: Express.Response) => {
    try {
  
      const result = await eventModel.find()
      res.status(200).json({result})
  
    } catch (error) {
      console.log(error)
      return res.status(400).json({msg: "ha ocurrido un error", error})
    }
  }

  export const createEvent = async (req: Express.Request, res: Express.Response) => {

    try {
      
      let newEvent = req.body
      const eventCreated = await eventModel.create(newEvent)
  
      if(eventCreated) return res.status(201).json({msg: "Evento Creado"})
      throw {msg: "Error al crear el evento"}
  
    } catch (error) {
      console.log(error)
      return res.status(400).json({msg: "ha ocurrido un error", error})
    }
  
  }

  export const updateEvent = async (req: Express.Request, res: Express.Response) => {
    // {
    //   _id:
    //   dataToUpdate: {} 
    // }
  
    try {
  
      let {dataToUpdate, _id } = req.body
      const updatedData = await eventModel.findByIdAndUpdate(_id, dataToUpdate)
  
      return res.status(204).json({msg: "Evento actualizado"})
  
    } catch (error) {
      console.log(error)
      return res.status(400).json({msg: "ha ocurrido un error", error})
    }
  }

  export const deleteEvent = async (req: Express.Request, res: Express.Response) => {
    try {
  
      let  {_id} =  req.params
  
      const deleted = await eventModel.findByIdAndDelete(_id)
      return res.status(200).json({msg: "Evento ELiminado"})
    } catch (error) {
      return res.status(400).json({msg: "ha ocurrido un error", error})
    }
  }

  

