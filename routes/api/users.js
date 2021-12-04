const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const validateRegisterInput = require("../../validations/register");
const validateLoginInput = require("../../validations/login");
const validateUserUpdate = require("../../validations/user-update");
const validateFriend = require("../../validations/friend-validate");
const passport = require("passport");
const keys = require("../../config/keys");

//when user create an event, besides trigger event create action also trigger user update action
//also, for friendsRequest, once the friendship is built, both User need to update their friends

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
              const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                eventsJoined: user.eventsJoined,
                eventsHosted: user.eventsHosted,
                friends: user.friends,
                requestsSent: user.requestsSent,
                requestsReceived: user.requestsReceived,
              };

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
        const payload = {
          id: user.id,
          email: user.email,
          name: user.name,
          eventsJoined: user.eventsJoined,
          eventsHosted: user.eventsHosted,
          friends: user.friends,
          requestsSent: user.requestsSent,
          requestsReceived: user.requestsReceived,
        };

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
      friends: req.user.friends,
      requestsSent: req.user.requestsSent,
      requestsReceived: req.user.requestsReceived,
    });
  }
);

router.post("/demoUser", (req, res) => {
  User.findOne({ _id: "61a5313a1f71a2b478a0f829" }).then((user) => {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      eventsJoined: user.eventsJoined,
      eventsHosted: user.eventsHosted,
      friends: user.friends,
      requestsSent: user.requestsSent,
      requestsReceived: user.requestsReceived,
    };

    jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
      res.json({
        success: true,
        token: "Bearer " + token,
      });
    });
  });
});

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const filter = req.body.filter;
    User.where("name")
      .all(`${filter}`)
      .then((users) => {
        let filteredUser = [];
        users.forEach((user) => {
          filteredUser.push({
            id: user.id,
            name: user.name,
            email: user.email,
            friends: user.friends,
            requestsReceived: user.requestsReceived,
            requestsSent: user.requestsSent,
          });
        });
        res.json(filteredUser);
      })
      .catch((err) => res.json(err));
  }
);

//using req.user.id to ensure we are finding the user from the jwt token and even if the user change the id in the route, they won't be able to update info for someone else

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.body.email) {
      const { errors, isValid } = validateUserUpdate(req.body);

      if (!isValid) {
        return res.status(400).json(errors);
      }
      User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
          errors.email = "User already exists";
          return res.status(400).json(errors);
        }
      });
    }

    User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
        },
      },
      { new: true }
    )
      .then((updatedUser) => {
        const user = {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          requestsSent: updatedUser.requestsSent,
          requestsReceived: updatedUser.requestsReceived,
        };
        res.json(user);
      })
      .catch((err) => res.json(err));
  }
);

//how to make these depedent destroy?

router.patch(
  "/:id/unfriend",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOneAndUpdate(
      { _id: req.body.friends },
      {
        $pull: {
          friends: req.body.friends,
        },
      },
      { new: true }
    );

    User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $pull: {
          friends: req.body.friends,
        },
      },
      { multi: true, new: true }
    )
      .then((updatedUser) => {
        const user = {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          friends: updatedUser.friends,
          requestsSent: req.user.requestsSent,
          requestsReceived: req.user.requestsReceived,
        };
        res.json(user);
      })
      .catch((err) => res.json(err));
  }
);

router.get(
  "/getFilteredUsers/:filter",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const filter = req.params.filter;
    User.find({ name: { $regex: `${filter}`, $options: "i" } })
      .then((users) => {
        let filteredUser = [];
        users.forEach((user) => {
          filteredUser.push({
            id: user.id,
            name: user.name,
            email: user.email,
            friends: user.friends,
            requestsSent: user.requestsSent,
            requestsReceived: user.requestsReceived,
          });
        });
        res.json(filteredUser);
      })
      .catch((err) => res.json(err));
  }
);

router.get("/allUsers", (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => res.status(400).json({ error: error }));
});

module.exports = router;
//hihi
