import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import rentInputStyles from "../styles/AddRent.module.scss";
import { server } from "../config";

const AddRent = ({ adminsData, session }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit(async (formData) => {
    try {
      const res = await axios.post(`${server}/api/rents`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log(res);

      if (res.status === 200) {
        alert("Data sent successfully"); //toast will be added here
        window.location.reload();
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      console.log(err.message);
      throw new Error(err);
    }
  });

  /* find the admins email to conditionally style the apartement data input form ====================== */
  const adminsEmail = adminsData?.find((ad) => ad.email);

  return (
    <div className={rentInputStyles.addRent}>
      <div
        style={{
          display:
            adminsEmail?.email === session?.user.email ? "block" : "none",
        }}
      >
        <form onSubmit={onSubmit}>
          <h1>Add Apartment</h1>
          <div>
            <input
              type="text"
              placeholder="Apartment Name"
              {...register("name", { required: true })}
            />
            <input
              type="text"
              placeholder="Location"
              {...register("location", { required: true })}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Bedroom"
              {...register("bedroom", { required: true })}
            />
            <input
              type="text"
              placeholder="Bathroom"
              {...register("bathroom", { required: true })}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Price"
              {...register("price", { required: true })}
            />

            <input
              type="file"
              id="upload-photo"
              // {...register("image1", { required: true })}
            />
          </div>
          <textarea type="text" {...register("about", { required: true })} />
          <textarea
            type="text"
            {...register("priceDetails", { required: true })}
          />
          <textarea
            type="text"
            {...register("propertyDetails", { required: true })}
          />

          <button type="submit">Add Apartment</button>
        </form>
      </div>
    </div>
  );
};

export default AddRent;
