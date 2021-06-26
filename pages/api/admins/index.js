/* eslint-disable import/no-anonymous-default-export */
/* with mongoose =========================== */
// import dbConnect from "../../../utils/dbConnect";
// import Admins from "../../../models/admins";

// dbConnect();

// export default async (req, res) => {
//   const { method } = req;

//   switch (method) {
//     case "GET":
//       try {
//         const admins = await Admins.find({});

//         res.status(200).json(admins);
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;

//     case "POST":
//       try {
//         console.log(req.body);
//         const admins = await Admins.create(req.body);

//         res.status(200).json({ success: true, data: admins });
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;

//     default:
//       res.status(400).json({ success: false });
//       break;
//   }
// };

/* with mongodb ========================*/
import { connectToDatabase } from "../../../utils/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  if (req.method === "GET") {
    try {
      const getAdminsData = await db.collection("admins").find({}).toArray();
      res.status(200).json(getAdminsData);
    } catch (err) {
      console.log(err);
      res.status(400).json({ success: false });
      throw new Error(err);
    }
  }
}
