/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../utils/dbConnect";
import Admins from "../../../models/admins";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const admins = await Admins.find({});

        res.status(200).json(admins);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        console.log(req.body);
        const admins = await Admins.create(req.body);

        res.status(200).json({ success: true, data: admins });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
