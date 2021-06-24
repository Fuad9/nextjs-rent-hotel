/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../utils/dbConnect";
import Rents from "../../../models/rents";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const rents = await Rents.find({});

        res.status(200).json(rents);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        console.log(req.body);
        const rents = await Rents.create(req.body);

        res.status(200).json({ success: true, data: rents });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
