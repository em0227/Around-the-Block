async function isValidEvent(res, req, next){
const errors = {};
const {name, description, location, time, imageUrl} = req.body;

if (Object.values(errors).length > 0){
    return res.status(422).json(errors)
}
next();
}
module.export = {isValidEvent};