/* eslint-disable import/no-anonymous-default-export */
import dbConnect from "../../../utils/dbConnect";
import Customers from "../../../models/customers";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const customers = await Customers.find({});
        console.log(customers);

        res.status(200).json(customers);
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "POST":
      try {
        console.log(req.body);
        const customers = await Customers.create(req.body);

        res.status(200).json({ data: customers });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
