const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");
const validateUserUpdate = require("../../validations/user-update");
const passport = require("passport");
const keys = require("../../config/keys");

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "User already exists";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => {
              const payload = { id: user.id, name: user.name };

              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token,
                  });
                }
              );
            })
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then((user) => {
    if (!user) {
      errors.email = "This user does not exist";
      return res.status(400).json(errors);
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = { id: user.id, email: user.email };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      eventsPlanned: req.body.eventsPlanned,
      eventsHosted: req.body.eventsHosted,
      friends: req.body.friends,
    });
  }
);

// router.get(
//   "/:id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     User.findById(req.params.id)
//       .then((user) => res.json(user))
//       .catch((err) =>
//         res
//           .status(404)
//           .json({ notweetsfound: "No user account found with that ID" })
//       );
//   }
// );
//was trying to have a 'ensure logged in' facility but seems unnecessary as the id will be hard to guess?

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //verify that the input is in correct format (how to verify the events and friends object?)
    const { errors, isValid } = validateUserUpdate(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const updates = {
      name: req.body.name,
      email: req.body.email,
      eventsPlanned: req.body.eventsPlanned,
      eventsHosted: req.body.eventsHosted,
      friends: req.body.friends,
    };

    //does structure like means when user create an event, it will trigger event create action and user update action?
    //also, for friendsRequest, once the friendship is built, both User need to update their friends

    User.findByIdAndUpdate({ _id: req.user.id }, updates, { new: true })
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch((err) =>
        res
          .status(404)
          .json({ notweetsfound: "No user account found with that ID" })
      );
  }
);

module.exports = router;
