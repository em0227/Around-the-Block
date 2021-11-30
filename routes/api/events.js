
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Event = require("../../models/Event");
const passport = require("passport");
const validateEventInput = require("../../validations/event");
const validateEventUpdate = require("../../validations/event");
const User = require("../../models/User");

router.get("/allEvents", (req, res) => {
  //events are being sent up as an array
  Event.find()
    .then((events) => {
      res.send(events);
    })
    .catch((error) => res.status(400).json({ error: error }));
});

router.get("/:id", (req, res) => {
  const event = Event.findOne({ _id: req.params.id }).exec();
  event
    .then(function (doc) {
      res.send(doc);
    })
    .catch((error) => res.status(400).json({ error: error }));
});

router.post(
  "/newEvent",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // console.log(req.body)
    const { errors, isValid } = validateEventInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Event.findOne({ name: req.body.name })
      .then((event) => {
        if (event) {
          errors.name = "This event name has already been taken";
          return res.status(400).json(errors);
        } else {
          const newEvent = new Event({
            name: req.body.name,
            description: req.body.description,
            location: req.body.location,
            imageUrl: req.body.imageUrl,
            time: req.body.time,
          });
          newEvent
            .save()
            .then((newEvent) => {
              User.findOneAndUpdate(
                { id: req.user.id },
                {
                  $addToSet: {
                    eventsHosted: newEvent._id,
                  },
                },
                { new: true }
              );
            //   console.log(newEvent, req || "abc");
              res.json(newEvent);
            })
            .catch((error) => {
              console.log("error", error);
              res.status(400).json(error);
            });
        }
      })
      .catch((error) => res.status(400).json({ error: error }));
  }
);

router.patch("/:id", (req, res) => {
  console.log(req.body);

  const { errors, isValid } = validateEventInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Event.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        imageUrl: req.body.imageUrl,
        time: req.body.time,
      },
      $addToSet: {
        guests: req.body.guests,
      },
    },
    { multi: true, new: true }
  )
    .then((updatedEvent) => res.json(updatedEvent))
    .catch((error) => res.status(400).json({ error: error }));
});

router.delete("/:id", (req, res) => {
  Event.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "Event has been deleted!" });
    })
    .catch((error) => res.status(400).json({ error: error }));
});

module.exports = router;
