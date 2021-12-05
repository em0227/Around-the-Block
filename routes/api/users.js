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

const lettersHash = {
  "a": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_a.png?raw=true",
  "b": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_b.png?raw=true",
  "c": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_c.png?raw=true",
  "d": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_d.png?raw=true",
  "e": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_e.png?raw=true",
  "f": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_f.png?raw=true",
  "g": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_g.png?raw=true",
  "h": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_h.png?raw=true",
  "i": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_i.png?raw=true",
  "j": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_j.png?raw=true",
  "k": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_k.png?raw=true",
  "l": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_l.png?raw=true",
  "m": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_m.png?raw=true",
  "n": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_n.png?raw=true",
  "o": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_o.png?raw=true",
  "p": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_p.png?raw=true",
  "q": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_q.png?raw=true",
  "r": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_r.png?raw=true",
  "s": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_s.png?raw=true",
  "t": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_t.png?raw=true",
  "u": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_u.png?raw=true",
  "v": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_v.png?raw=true",
  "w": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_w.png?raw=true",
  "x": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_x.png?raw=true",
  "y": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_y.png?raw=true",
  "z": "https://github.com/snigdhabanda/Hack/blob/main/app/assets/images/letter_z.png?raw=true"

}

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
          const pictureUrl = lettersHash[req.body.name[0].toLowerCase()] 
          pictureUrl ? newUser.picture = pictureUrl : newUser.picture = "noPicture"
          newUser
            .save()
            .then((user) => {
              const payload = {
                id: user.id,
                name: user.name,
                email: user.email,
                picture: user.picture,
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
          picture: user.picture,
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
      picture: req.user.picture,
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
      picture: user.picture,
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
            picture: user.picture,
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
          picture: updatedUser.picture,
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
      { _id: req.params.id },
      {
        $pull: {
          friends: {friendId: req.user.id},
        },
      },
      { new: true }
    ).then((user) => console.log(""));

    User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $pull: {
          friends: {friendId: req.params.id},
        },
      },
      { multi: true, new: true }
    ).then((user) => 
        res.json(user))
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
            picture: user.picture,
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
