import { PrivacyIcon } from "assets";
import * as React from "react";
import styles from "./styles.module.css";

const RefundUI = () => {
  return (
    <>
      <div className={`appContainer ${styles.terms}`}>
        <h1 className={styles.ttl}>Refund Policy</h1>
        <p className={styles.txt}>Last Updated March 3rd, 2024</p>
        <PrivacyIcon className={styles.icon} />
        <div className={styles.info}>
          <p>
            At Roofbucks, we understand that unforeseen circumstances may arise
            during the property purchasing process. As part of our commitment to
            providing a seamless and transparent experience, we have established
            the following refund policy for our users:
          </p>
          <p>
            Please read this Refund Policy carefully before using the Site or
            accessing any of the Services.
          </p>

          <h4>ACCEPTANCE OF THIS REFUND POLICY</h4>
          <p>
            By using the Roofbucks platform and services, users agree to adhere
            to the terms and conditions outlined in this refund policy. For any
            questions or assistance regarding refunds, users may contact
            Roofbucks' customer support team for further guidance.
          </p>
          <h4>AMENDMENTS TO THIS REFUND POLICY; CHANGES TO YOUR INFORMATION</h4>
          <p>
            This refund policy is subject to change at any time without prior
            notice. Users are encouraged to review the policy periodically for
            updates
          </p>

          <h4>Refund Eligibility Criteria</h4>

          <ul className={styles.list2}>
            <li>
              <b>Financial Inability to enter a collaboration</b>
              <ul>
                <li>
                  If an aspiring home buyer's financial situation indicates that
                  they do not meet our standards for a collaborative partnership
                  or do not meet the financial requirements to co-own the
                  property he/she intends to purchase, Roofbucks will refund
                  their deposited amount which they paid during their
                  application process.
                </li>
              </ul>
            </li>
            <li>
              <b>Inability to get a collaboration within 180 working Days</b>
              <ul>
                <li>
                  In the event that a home buyer is unable to get a
                  collaboration for their intended property within the maximum
                  period of 180 working days, the homebuyer can request for a
                  refund.
                  <br />
                  <b>Please note:</b> while home acquisitions can often be done
                  within a shorter time-frame or as it varies, certain factors
                  such as investor(s) due diligence and market conditions may
                  contribute to delays.
                </li>
              </ul>
            </li>
            <li>
              <b>Property Confiscation Due to Defaulting</b>
              <ul>
                <li>
                  If a property is confiscated from a home buyer due to
                  non-payment of rent or inability to buy back 100% of the
                  property in due time as stated in their contract, Roofbucks
                  will refund the home buyer (excluding any service fees paid)
                  and this refund will only be processed on the condition that
                  Roofbucks successfully finds a new buyer who is willing to
                  purchase the old home buyer's ownership percentage in the
                  property and take over the it.
                </li>
              </ul>
            </li>
          </ul>

          <h4>Refund Request Process</h4>

          <ul className={styles.list2}>
            <li>
              The user must submit a formal refund request to Roofbucks,
              providing relevant details such as the transaction or application
              number, reasons for the refund, and any supporting documentation
            </li>
            <li>
              All refund requests will be reviewed by Roofbucks' team, and a
              decision will be communicated to the user within a reasonable
              timeframe.
            </li>
          </ul>

          <h4>Refund Processing Time and Disbursement</h4>

          <ul className={styles.list2}>
            <li>
              Upon approval of the refund request, Roofbucks will initiate the
              refund process within a reasonable timeframe.
            </li>
            <li>
              Refunds will be disbursed using the original payment method
              whenever possible. In cases where the original payment method is
              not available, alternative arrangements may be made at the
              discretion of Roofbucks.
            </li>
          </ul>

          <h4>Non-Refundable Items</h4>

          <ul className={styles.list2}>
            <li>
              In a case of property confiscation due to defaulting as stated in
              the section 1c of this policy, the service fees paid to Roofbucks
              or any third party on the platform are not refunded.
            </li>
            <li>
              Roofbucks does not acknowledge and will not be held liable for any
              payment made outside the platform and will not refund any money
              paid to any business or person(s) outside the Roofbucks platform.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export { RefundUI };
