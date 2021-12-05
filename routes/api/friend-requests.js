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
    
    errors = {};
    FriendRequest.findOne({
      requesterId: req.user.id,
      recipientId: req.body.recipient.id,
    }).then((record) => {
      if (record) {
        errors.recipient = "You already sent a friend request to this person.";
        return res.status(400).json(errors);
      } 
      else if (req.user.id === req.body.recipient.id) {
        errors.recipient = "This is you! You cannot friend yourself.";
        return res.status(400).json(errors);
      }
      else {
        const newRequest = new FriendRequest({
          requesterId: req.user.id,
          requesterName: req.user.name,
          requesterImage: req.user.picture,
          requesterEmail: req.user.email,
          recipientId: req.body.recipient.id,
          recipientName: req.body.recipient.name,
          recipientEmail: req.body.recipient.email,
          recipientImage: req.body.recipient.image,
          status: "pending"
        });
        newRequest
          .save()
          .then((request) => {
      
            User.findOneAndUpdate(
              { _id: request.requesterId },
              {
                $addToSet: {
                  requestsSent: {
                    
                    recipientId: request.recipientId,
                    recipientName: request.recipientName,
                    recipientEmail: request.recipientEmail,
                    recipientImage: request.recipientImage,
                    _id: request._id,
                    status: "pending"
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
                $addToSet: {
                  requestsReceived: {
                    
                    requesterId: request.requesterId,
                    requesterName: request.requesterName,
                    requesterEmail: request.requesterEmail,
                    requesterImage: request.requesterImage,
                    _id: request._id,
                    status: "pending"
                  }
              }
            },
              { new: true }
            ).then(user => console.log(""))
            
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
    FriendRequest.findOneAndUpdate(
      { _id: req.body.request},
      {status: req.body.status},
      { new: true}
    ).then((record) => {
      if (record.status === "approved") {
        User.findOneAndUpdate(
          { _id: record.recipientId },
          {
            $addToSet: {
              friends: {
                
                friendId: record.requesterId,
                friendName: record.requesterName,
                friendEmail: record.requesterEmail,
                friendImage: record.requesterImage,
                status: record.status
              
              }
            },
            $pull: {
              requestsReceived: {
                requesterId: record.requesterId
              }
            }
          },
          { new: true }
        ).then(user => res.json(user))
          .catch(err => res.json(err))

        User.findOneAndUpdate(
          { _id: record.requesterId },
          {
            $addToSet: {
              friends: {
                
                friendId: record.recipientId,
                friendName: record.recipientName,
                friendEmail: record.recipientEmail,
                friendImage: record.recipientImage,
                status: record.status
                
              }
            },
            $pull: {
              requestsSent: {
                recipientId: record.recipientId
                }
              }
          },
          { new: true }
        ).then(user => console.log(""))
       
      } else {
        //delete this record
        FriendRequest.deleteOne({ _id: record._id })
          .then((res) => console.log(""))
          
        
        User.findOneAndUpdate(
            { _id: record.recipientId },
            {
              $pull: {
                requestsReceived: {
                  requesterId: record.requesterId
                }
              }
            },
            {new: true})
            .then(user => res.json(user))
            .catch(err => res.json(err))

        User.findOneAndUpdate(
          { _id: record.requesterId },
          {
            $pull: {
              requestsReceived: {
                recipientId: record.recipientId
              }
            }
          },
          {new: true})
          .then(user => console.log(""))
          
        
        
      }
    });
  }
);

module.exports = router;
