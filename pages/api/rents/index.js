/* eslint-disable import/no-anonymous-default-export */
// import dbConnect from "../../../utils/dbConnect";
// import Rents from "../../../models/rents";

// dbConnect();

// export default async (req, res) => {
//   const { method } = req;

//   switch (method) {
//     case "GET":
//       try {
//         const rents = await Rents.find({});

//         res.status(200).json(rents);
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;

//     case "POST":
//       try {
//         const rents = await Rents.create(req.body);

//         res.status(200).json({ success: true, data: rents });
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;

//     default:
//       res.status(400).json({ success: false });
//       break;
//   }
// };

/* example with mongodb =========================*/
import { connectToDatabase } from "../../../utils/mongodb";
import { ObjectID } from "mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const search = req.query.search;

        const getSearchedRentsData = await db
          .collection("hotels")
          .find({
            location: { $regex: search, $options: "i" },
          })
          .toArray();

        res.status(200).json(getSearchedRentsData);
      } catch (err) {
        console.log(err);
        res.status(400).json({ success: false });
        throw new Error(err);
      }
      break;

    case "POST":
      try {
        const name = req.body.name;
        const location = req.body.location;
        const bedroom = req.body.bedroom;
        const bathroom = req.body.bathroom;
        const price = req.body.price;
        const about = req.body.about;
        const priceDetails = req.body.priceDetails;
        const propertyDetails = req.body.propertyDetails;

        const postRentsData = await db
          .collection("hotels")
          .insertOne({
            name,
            location,
            bedroom,
            bathroom,
            price,
            about,
            priceDetails,
            propertyDetails,
          })
          .then((result) => {
            return result;
          });
        res.status(200).json({ success: true, data: postRentsData });
      } catch (err) {
        console.log(err);
        res.status(400).json({ success: false });
        throw new Error(err);
      }

    case "DELETE":
      try {
        const deleteRentsData = db
          .collection("hotels")
          .deleteOne({ _id: ObjectID(req.query.id) })
          .then((result) => {
            res.status(200).json(result);
          });
        res.status(200).json({ success: true, data: deleteRentsData });
      } catch (err) {
        console.log(err);
        res.status(400).json({ success: false });
        throw new Error(err);
      }

    default:
      res.status(400).json({ success: false });
      break;
  }
};
