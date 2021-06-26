/* eslint-disable import/no-anonymous-default-export */
/* example with mongoose ============================ */
// import dbConnect from "../../../utils/dbConnect";
// import Customers from "../../../models/customers";

// dbConnect();

// export default async (req, res) => {
//   const { method } = req;

//   switch (method) {
//     case "GET":
//       try {
//         const customers = await Customers.find({});
//         console.log(customers);

//         res.status(200).json(customers);
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;

//     case "POST":
//       try {
//         console.log(req.body);
//         const customers = await Customers.create(req.body);

//         res.status(200).json({ data: customers });
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
        const getCustomersData = await db
          .collection("customers")
          .find({})
          .toArray();
        res.status(200).json(getCustomersData);
      } catch (err) {
        console.log(err);
        res.status(400).json({ success: false });
        throw new Error(err);
      }
      break;

    case "POST":
      try {
        const name = req.body.name;
        const phone = req.body.phone;
        const email = req.body.email;
        const rentname = req.body.rentname;
        const comments = req.body.comments;

        const postCustomersData = await db
          .collection("customers")
          .insertOne({
            name,
            phone,
            email,
            rentname,
            comments,
            status: "Pending",
          })
          .then((result) => {
            return result;
          });
        res.status(200).json({ success: true });
        return postCustomersData;
      } catch (err) {
        console.log(err);
        res.status(400).json({ success: false });
        throw new Error(err);
      }

    case "PUT":
      try {
        const updateCustomersData = await db
          .collection("customers")
          .updateOne(
            { _id: ObjectID(req.body.id) },
            {
              $set: { status: req.body.status },
            }
          )
          .then((result) => {
            return result;
          });
        res.status(200).json({ success: true });
        return updateCustomersData;
      } catch (err) {
        console.log(err);
        res.status(400).json({ success: false });
        throw new Error(err);
      }

    case "DELETE":
      console.log(req.query.id);
      try {
        const deleteCustomersData = db
          .collection("customers")
          .deleteOne({ _id: ObjectID(req.query.id) })
          .then((result) => {
            return result;
          });
        res.status(200).json({ success: true });
        return deleteCustomersData;
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
