import React from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/AddCustomer.module.scss";
import { server } from "../config/index";
import { useRouter } from "next/router";
import axios from "axios";

const AddCustomer = ({ rt, session }) => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData);
    try {
      const res = await axios.post(`/api/customers`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log(res);

      if (res.status === 200) {
        alert("Data sent successfully"); //toast will be added here
        // setTimeout(() => {
        //   session
        //     ? (window.location.href = "/profile")
        //     : (window.location.href = "/login");
        // }, 3000);
      } else {
        alert("Something went wrong, please try again");
      }
    } catch (err) {
      console.log(err.message);
      throw new Error(err);
    }
  });

  return (
    <form className={styles.userProfile} onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Full Name"
        {...register("name", { required: true })}
      />
      <input
        type="text"
        placeholder="Phone No"
        {...register("phone", { required: true })}
      />
      <input
        type="text"
        placeholder="Email Address"
        {...register("email", { required: true })}
      />
      <input
        type="text"
        defaultValue={rt.name}
        {...register("rentname", { required: true })}
      />
      <input type="text" {...register("status", { required: true })} />
      <textarea
        type="text"
        placeholder="Message"
        {...register("comments", { required: true })}
      />

      <button type="submit">Request Booking</button>
    </form>
  );
};

export default AddCustomer;
