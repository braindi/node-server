// import mongoose from "mongoose";
// import Joi from "joi";

// const minimalBagSchema = mongoose.Schema({
//     company: String,
//     color: String,
//     price: Number,
//     size: { type: String, default: "M" },
//     ///image
//     count: { type: Number, default: 1 }
// })

// export const MinimalBag = mongoose.model("minimalBags", minimalBagSchema);

// export const minimalBagValidator = (minimalBagToValidate) => {
//     let minimalBagJoi = Joi.object({
//         company: Joi.string().min(2).max(15).required(),
//         color: Joi.string().required(),
//         price: Joi.number().required()
//     }).unknown()
//     return minimalBagJoi.validate(minimalBagToValidate);
// }