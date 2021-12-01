const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const passport = require("passport");
const FriendRequest = require("../../models/FriendRequest");

router.get("/test", (req, res) => {
  res.json("this is the friendrequest test route");
});

router.get(
  "/friendinvites",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //only want to get the invites
    FriendRequest.find({ recipient: req.user.id })
      .then((results) => res.json(results))
      .catch((err) => res.json(err));
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //only want to get the invites
    FriendRequest.find({ requester: req.user.id })
      .then((results) => res.json(results))
      .catch((err) => res.json(err));
  }
);

router.post(
  "/newFriendRequest",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // debugger
    // console.log(req)
    errors = {};
    FriendRequest.findOne({
      requesterId: req.user.id,
      recipientId: req.body.recipient.id,
    }).then((record) => {
      if (record) {
        errors.recipient = "Already sent friend request to this person";
        return res.status(400).json(errors);
      } else {
        // console.log(req.user.id, req.user.name, req.user.email, req.body.recipient.id, req.body.recipient.name,req.user.email)
        const newRequest = new FriendRequest({
          requesterId: req.user.id,
          requesterName: req.user.name,
          requesterEmail: req.user.email,
          recipientId: req.body.recipient.id,
          recipientName: req.body.recipient.name,
          recipientEmail: req.body.recipient.email,
          status: "pending"
        });
        newRequest
          .save()
          .then((request) => {
            // console.log(request)
            // console.log("req", req)
            User.findOneAndUpdate(
              { _id: request.requesterId },
              {
                $push: {
                  requestsSent: {
                    $each: [{
                    recipientId: request.recipientId,
                    recipientName: request.recipientName,
                    recipientEmail: request.recipientEmail,
                    status: "pending"}]
                  }
                  
                },
              },
              { new: true }
            ).then(
              (user) => res.json(user))
              .catch((err) => res.json(err));
              
            

            User.findOneAndUpdate(
              { _id: request.recipientId },
              {
                $push: {
                  requestsReceived: {
                    $each: [{
                    rquesterId: request.requesterId,
                    requesterName: request.requesterName,
                    requesterEmail: request.requesterEmail,
                    status: "pending"}]
                  }
              }
            },
              { new: true }
            )
            
          })
          .catch((err) => res.json(err));
      }
    });
  }
);

router.patch(
  "/updateFriendRequest",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // debugger
    FriendRequest.findOneAndUpdate(
      { recipient: req.user.id, requester: req.body.requester},
      { status: req.body.status },
      { new: true }
    ).then((record) => {
      if (record.status === "approved") {
        // trigger update requester
        // trigger update recipient
        User.findOneAndUpdate(
          { _id: record.requester },
          {
            $addToSet: {
              friends: record.recipient,
            },
          },
          { new: true }
        );

        User.findOneAndUpdate(
          { _id: record.recipient },
          {
            $addToSet: {
              friends: record.requester,
            },
          },
          { new: true }
        )
          .then((updatedUser) => res.json(updatedUser))
          .catch((err) => res.json(err));
      } else {
        //delete this record
        FriendRequest.deleteOne({ _id: record.id })
          .then((res) => res.json("you are not friends anymore :("))
          .catch((err) => res.json(err));
      }
    });
  }
);

module.exports = router;
