import React from "react";
import serviceList from "../styles/Service.module.scss";
import Image from "next/image";

const Services = () => {
  return (
    <section className={`container ${serviceList.serviceContainer}`}>
      <h4>Service</h4>
      <h3>
        We are an agency tailored to all <br />
        clients needs that always delivers
      </h3>

      <div className="split">
        <div>
          <Image
            width={19}
            height={19}
            src="/images/apartment 1.png"
            alt="service one"
          />
          <h4>Wide Range of Properties</h4>
          <h6>
            With a robust selection of popular <br /> properties on hand, as
            well as <br />
            leading properties from experts.
          </h6>
        </div>

        <div>
          <Image
            width={19}
            height={19}
            src="/images/affordable 1.png"
            alt="service one"
          />
          <h4>Financing Made Easy</h4>
          <h6>
            Our stress-free finance department <br /> that can find financial
            solutions to <br /> save you money.
          </h6>
        </div>

        <div>
          <Image
            width={19}
            height={19}
            src="/images/lessee 1.png"
            alt="service one"
          />
          <h4>Wide Range of Properties</h4>
          <h6>
            With a robust selection of popular <br /> properties on hand, as
            well as <br />
            leading properties from experts.
          </h6>
        </div>
      </div>
    </section>
  );
};

export default Services;
