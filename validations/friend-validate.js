module.exports = async function validateFriend(data) {
  let errors = {};

  await User.findById({ _id: data.friends })
    .then((friend) => console.log("success"))
    .catch((err) => {
      errors.friends = "Can not find your friend";
    });

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
