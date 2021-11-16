const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const Event = require('../../models/Event');
const validateEventInput = require('../../validations/event');

router.get("/events", (req, res) => {
    const { errors, isValid } = validateEventInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    Event.find({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = "User already exists";
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        }); 
      }

    });
  });

  router.get("/events", (req, res) => {
    const { errors, isValid } = validateEventInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    Event.find({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = "User already exists";
        return res.status(400).json(errors);
      } else {
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        }); 
      }

    });
  });

