import mongoose from "mongoose";
import Joi from "joi";

const bagSchema = mongoose.Schema({
    company: String,
    description: { type: String, default: " " },
    color: String,
    price: Number,
    size: { type: String, default: "M" },
    width: { type: Number, default : 0 },
    height: { type: Number, default : 0 },
    generateDate: { type: Date, default: Date.now() },
    imgUrl: { type: String, default: "_1_8_18465_1.jpg"}
   
})

export const Bag = mongoose.model("bags", bagSchema);

export const bagValidator = (bagToValidate) => {
    let bagJoi = Joi.object({
        company: Joi.string().min(2).max(15).required(),
        description: Joi.string().default(" "),
        color: Joi.string().required(),
        price: Joi.number().required(),
        size: Joi.string().default("M"),
        width: Joi.number().default(0),
        height: Joi.number().default(0),
        generateDate: Joi.date().default(Date.now()),
        imgUrl:Joi.string().default('_1_8_18465_1.jpg')
    }).unknown()
    return bagJoi.validate(bagToValidate);
}
