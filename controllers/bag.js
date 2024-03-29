import { Bag, bagValidator } from '../models/bag.js';
import mongoose from 'mongoose';

export const getAllBags = async (req, res) => {
    let { searchSize, searchColor, searchCompany, searchDescription, numPages, page, perPage } = req.query;
    try {
        let allBags;
        let searchObject = {};
        if (searchColor)
            searchObject.color = new RegExp(searchColor, "i");
        if (searchSize)
            searchObject.size = new RegExp(searchSize, "i");
        if (searchCompany)
            searchObject.company = new RegExp(searchCompany, "i");
        if (searchDescription)
            searchObject.description = new RegExp(searchDescription, "i");

        if (numPages)
            searchObject.numPages = numPages;
        allBags = await Bag.find(searchObject)
            .skip((page - 1) * perPage)
            .limit(perPage);
        res.json(allBags);
    }
    catch (err) {
        res.status(400).send("unable to get all bags " + err.message)
    }
}

export const getBagByCode = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id))
            return res.status(400).send("code is not valid");
        let bag = await Bag.findById(req.params.id);
        if (!bag)
            return res.status(404).send("bag does not exist");
        res.json(bag);
    }
    catch (err) {
        res.status(400).send("an error occurred " + err);
    }

}


export const addBag = async (req, res) => {

    let { company, description, color, price, size, width, height, generateDate, imgUrl } = req.body;
    if (!company || !color || !price || !size)
        return res.status(404).send("missing require parameter");
    let validate = bagValidator(req.body);
    if (validate.error)
        return res.status(400).json(validate.error.details[0].message);
    try {
        let existBag = await Bag.find({ company, color, price, size });
        if (existBag.length > 0)
            return res.status(409).send("this bag already exists")
        let newBag = await Bag.create({ company, description: description || " ", color, price, size: size || "M", width: width || 0 , height: height || 0, generateDate: generateDate || Date.now(), imgUrl: imgUrl || '_1_8_18465_1.jpg' });
        return res.status(201).json(newBag);
    }
    catch (err) {
        res.status(400).send("unable to add this bag " + err);
    }
}

export const deleteBag = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("code is not valid");
    let deletedBag = await Bag.findByIdAndDelete(id);
    if (!deletedBag)
        return res.status(404).send("There is no bag with this code");
    return res.json(deletedBag);
}

export const updateBag = async (req, res) => {
    let { id } = req.params;
    if (!mongoose.isValidObjectId(id))
        return res.status(400).send("code is not valid");
    try {
        let bagToUpdate = await Bag.findById(id);
        if (!bagToUpdate)
            return res.status(404).send("There is no bag with this code");
        bagToUpdate.company = req.body.company || bagToUpdate.company;
        bagToUpdate.description = req.body.description || bagToUpdate.description;
        bagToUpdate.color = req.body.color || bagToUpdate.color;
        bagToUpdate.price = req.body.price || bagToUpdate.price;
        bagToUpdate.size = req.body.size || bagToUpdate.size;
        bagToUpdate.width = req.body.width || bagToUpdate.width;
        bagToUpdate.height = req.body.height || bagToUpdate.height;
        bagToUpdate.imgUrl = req.body.imgUrl || bagToUpdate.imgUrl;
        bagToUpdate.generateDate = req.body.generateDate || bagToUpdate.generateDate;

        await bagToUpdate.save();
        res.json(bagToUpdate);
    }
    catch (err) {
        res.status(400).send("an error occurred " + err);
    }
}

export const getNumPages = async (req, res) => {
    try {
        let allBags = await Bag.countDocuments();
        // let perPage = req.query.perPage || 10;
        let jsonBag = JSON.stringify(allBags);
        // let numPages = Math.ceil(allBags / perPage)
        return res.send(jsonBag);
    }

    catch (err) {
        return res.status(400).send("an error occurred " + err);
    }
}

export const getNumOfPages = async (req, res) => {
    try {
        let allBags = await Bag.countDocuments();
        let perPage = req.query.perPage || 12;
        let numPages = Math.ceil(allBags / perPage)
        let jsonNumPage = JSON.stringify(numPages);
        return res.send(jsonNumPage);        
    }
        
    catch (err) {
        return res.status(400).send("an error occurred " + err);
    }
}
