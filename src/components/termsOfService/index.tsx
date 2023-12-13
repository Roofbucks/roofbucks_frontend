import { TermsIcon } from "assets";
import * as React from "react";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import { Routes } from "router";

const TermsOfServiceUI = () => {
  return (
    <>
      <div className={`appContainer ${styles.terms}`}>
        <h1 className={styles.ttl}>Terms Of Service</h1>
        <p className={styles.txt}>Last Updated 9th December, 2023</p>
        <TermsIcon className={styles.icon} />
        <div className={styles.info}>
          <p>
            Welcome to Roofbucks! By using our platform, you agree to comply
            with and be bound by the following terms and conditions. Please read
            these carefully before accessing or using Roofbucks.{" "}
          </p>
          <p>
            This User Agreement between you (referred to herein as “you”, “User”
            or “customer”) and Roofbucks governs your access and use of
            Roofbucks' products, services, technologies or other offerings,
            whether provided via
            <span style={{ color: "var(--green)" }}> www.roofbucks.com</span> ,
            associated websites, or the Roofbucks dashboard app.
          </p>
          <p>
            By signing up for an account or otherwise using the Roofbucks
            Platform, you agree that you have read, understood and agree to
            comply with the terms of this User Agreement. If you do not agree
            with anything contained in this User Agreement, please do not create
            an account, submit information to, access information from, or
            otherwise interact with the Roofbucks Platform. In addition to this
            User Agreement, your use of the Roofbucks Platform is also governed
            by our Privacy Policy, Cookie Policy, and E-Sign Consent, and you
            acknowledge that you have read, understood and agree to comply with
            the terms of those policies.
          </p>
          <p>
            Note that we may update this User Agreement from time to time, and
            while we will typically notify you in the event of changes, it is
            your responsibility to review the User Agreement from time to time
            to see if it has been updated. Your continued use of the Roofbucks
            Platform following any updates to this User Agreement constitutes
            your acceptance of the updated terms, unless we are required by law
            to get your affirmative consent.
          </p>

          <p>We may supplement this User Agreement with the following:</p>
          <ul className={styles.list1}>
            <li>
              <b>Specific Terms Agreed to by You. </b> If you qualify to
              participate in one or more Roofbucks products or services, we may
              ask you to enter into one or more supplemental agreements with us.
              In that event, the terms contained in those agreements will
              supplement the below provisions relating to the collection, use,
              sharing, and securing of your information.
            </li>
            <li>
              <b>Other Supplemental Notices. </b>Additionally, we may supplement
              this User Agreement with other supplemental notices posted on
              specific web pages within the Site or within the Roofbucks mobile
              application
            </li>
            <li>
              <b>Partner Terms. </b>Some of the services and features that you
              can access through the Roofbucks Platform (“Third Party Services”)
              are offered directly by, or in partnership with, third parties
              (“Third Party Providers”). As part of accessing those Third Party
              Services you may be required to agree to additional terms and
              conditions directly with one or more Third Party Providers, and
              those terms shall govern your use of such Third Party Services
              (“Third Party Terms”).
            </li>
          </ul>
          <h4>OVERVIEW</h4>
          <ul className={styles.list2}>
            <li>
              <b>Roofbucks Platform. </b>Roofbucks provides a platform that
              connects real estate agents, homebuyers, and investors for shared
              homeownership. Real estate agents list properties, homebuyers
              select homes, and investors collaborate to share the cost.
            </li>
          </ul>

          <h4>ACCOUNT ELIGIBILITY & REGISTRATION</h4>
          <ul className={styles.list2}>
            <li>
              <b>Eligibility. </b>Certain elements of the Roofbucks Platform are
              publicly accessible, such as the Roofbucks website. However, to
              use certain features of the Roofbucks Platform, you must be at
              least 18 years old and reside in Africa and must be capable of
              forming a binding contract to use Roofbucks. Real estate agents,
              homebuyers, and investors must register and create an account to
              access the platform. Additionally, certain products and services
              may not be available within your specific state or territory. As
              we are able to expand the availability of the Roofbucks Platform
              to additional jurisdictions, you may gain access to certain
              products and services that were not previously available.
              Conversely, we may cease offering certain products and services in
              a given jurisdiction from time to time.
            </li>
            <li>
              <b>Accurate Information. </b>To access many of the features of the
              Roofbucks Platform, you must register for an account (an
              “Account”), which will require you to provide certain information
              to Roofbucks including your name, email address, phone number,
              date of birth and other information that we may request. In
              creating an Account and submitting any information to Roofbucks,
              you agree that all such information is accurate and that should
              any of the information change, you will notify us as soon as
              possible.
            </li>
            <li>
              <b> Account Security. </b>In creating and maintaining your
              Account, you are responsible for creating a strong password and
              maintaining security and control of such password and any other
              login information.  You also agree to take whatever other security
              measures available, such as two-factor authentication through your
              mobile phone number or mobile device. Failure to do so may result
              in an unauthorised third party gaining access to your Account,
              which could result in the loss of personal and financial data as
              well as loss of funds available within your Account or any linked
              bank account.  Further, you agree to never share your login
              credentials with any other person, or allow anyone else to access
              your Account.
            </li>
            <li>
              <b>Identity Verification.</b> In order to verify your identity and
              the accuracy of the information provided by you during Account
              registration we may require you to submit certain additional
              information or documentation, including, without limitation, a
              copy of an unexpired government issued photo identification card
              such as a driver’s license or passport.  Further, you hereby
              authorize us, or a third party service provider that we designate,
              to take any steps necessary to further verify your identity.  If
              we are unable to verify your Account information or we determine
              that the information provided by you is incorrect, we may be
              required to prevent you from creating an Account, close or suspend
              your existing Account, or take any other steps we determine to be
              necessary.
            </li>
          </ul>

          <h4>Roles and Responsibilities</h4>
          <ul className={styles.list2}>
            <li>
              <b>Real Estate Agents. </b>Agents are responsible for providing
              accurate property information, and they agree not to misrepresent
              any aspect of the properties listed on Roofbucks.
            </li>
            <li>
              <b>Homebuyers. </b>Homebuyers are responsible for their property
              selections and agree to collaborate transparently with roofbucks
              in paying their rents, buying back the ownership up to 100% of the
              property before the end of the period of five (5) years and to
              follow the terms of the shared ownership agreement.
            </li>
            <li>
              <b>Investors. </b>Investors agree to provide financial support
              based on the terms of the shared ownership agreement, and they
              acknowledge the potential risks associated with real estate
              investments and are obligated to automatically sell their
              ownership to the homebuyer based on the percentage they are buying
              at any moment.
            </li>
          </ul>

          <h4>Transactions and Financial Agreements</h4>
          <ul className={styles.list2}>
            <li>
              <b>Financial Transactions. </b>Users agree to conduct all
              financial transactions through Roofbucks. Any attempt to
              circumvent the platform for transactions is a violation of these
              terms.
            </li>
            <li>
              <b>Fees. </b> Roofbucks may charge fees for certain transactions,
              and users will be notified of these fees. Users agree to pay
              applicable fees promptly.
            </li>
            <li>
              <b>Refund. </b>If a property is to be confiscated from a homebuyer
              due to rent payment or maintenance defaultings, Roofbucks will
              refund the homebuyer (excluding any service fees paid) only on the
              condition that Roofbucks finds a new buyer who will pay for their
              percentage ownership in the property and take over.
            </li>
            <li>
              <b>Penalty fee. </b>Roofbucks allows a normal maximum period of
              five (5) years to completely buy and own 100% of the property. If
              it exceeds the period of five (5), the homebuyer will incur a
              penalty fee of extra 10% of the subsequent rents amount.
            </li>
          </ul>

          <h4>Privacy and Security</h4>
          <ul className={styles.list2}>
            <li>
              <b>Privacy. </b>Roofbucks respects user privacy. Personal
              information is handled in accordance with our{" "}
              <Link style={{ color: "var(--green)" }} to={Routes.privacy}>Privacy Policy</Link>.
            </li>
            <li>
              <b>Security. </b> Users are responsible for maintaining the
              security of their accounts and passwords. Any unauthorized use
              should be reported promptly.
            </li>
          </ul>

          <h4>Content and Intellectual Property</h4>
          <ul className={styles.list2}>
            <li>
              <b>Property Listings. </b>Real estate agents retain ownership of
              property listings. By uploading, agents grant Roofbucks the right
              to display, distribute, and promote these listings.
            </li>
            <li>
              <b>Platform Content. </b>Roofbucks retains ownership of platform
              content. Users agree not to use, modify, reproduce, or distribute
              any content without explicit permission.
            </li>
          </ul>

          <h4>Dispute Resolution</h4>
          <ul className={styles.list2}>
            <li>
              <b>Mediation/Arbitration. </b>Any disputes arising from the use of
              Roofbucks shall be resolved through mediation or arbitration in
              accordance with the laws governing these terms.
            </li>
            <li>
              <b>Limitation of Liability. </b>Roofbucks and its affiliates,
              agents, officers, and employees will not be liable to you under
              any theory of liability—whether based in contract, tort,
              negligence, strict liability, warranty, or otherwise—for any
              indirect, consequential, exemplary, incidental, punitive or
              special damages or lost profits, even if Roofbucks has been
              advised of the possibility of such damages. The total liability of
              Roofbucks for any claim arising out of or relating to this User
              Agreement or your use of the Roofbucks Platform, regardless of the
              form of the action, is limited to the amount paid, if any, by you
              to access or use the Roofbucks Platform.
            </li>
            <li>
              <b>Indemnification. </b>You agree to indemnify, defend and hold
              Roofbucks and its agents, contractors, services providers and
              affiliates (“Indemnified Parties”), harmless against all
              liabilities, claims, demands, damages, losses, fines, judgments,
              disputes, costs, charges and expenses (including, without
              limitation, reasonable attorneys' fees incurred in connection with
              such claims) made by you or others resulting from, arising out of
              or related to (i) any breach or alleged breach of this User
              Agreement or any related policies such as our Privacy Policy, (ii)
              your violation of any law, regulation, order or the rights of a
              third party, (iii) Roofbucks’ or any other Indemnified Party's
              reliance on Account information, transaction instructions, or
              other information and data furnished by you or (iii) information
              and data resulting from activities that Roofbucks or any other
              Indemnified Party undertakes at your request, or at the request of
              anyone Roofbucks or any other Indemnified Party believes in good
              faith to be your authorized agent, in providing the Services on
              the Roofbucks Platform.
            </li>
            <li>
              <b>Third Party Websites and Services. </b>The Roofbucks Platform
              relies in whole or partly, on Third Party Services and third party
              software and the continued development and support of third
              parties’ use of the Roofbucks Platform may be made conditional
              upon consenting to the terms and conditions of technology or
              functionality provided by such Third Party Providers or others.
              There is no assurance or guarantee that those third parties will
              maintain their support of their software, which might have a
              material adverse effect on the Roofbucks Platform. The Roofbucks
              Platform may contain links to third party vendors, websites,
              resources and services (“Third Party Material”) not controlled by
              us. You acknowledge and agree that Roofbucks is not responsible or
              liable for (i) availability or accuracy of such Third Party
              Material, or (ii) the content, products or services on or
              available from such Third Party Material. You acknowledge sole
              responsibility for and assume all risk arising from your use of
              any such Third Party Material.
            </li>
          </ul>

          <h4>Termination</h4>
          <ul className={styles.list2}>
            <li>
              <b>Termination. </b>Roofbucks reserves the right to terminate or
              suspend user accounts without notice for violations of these
              terms.
            </li>
          </ul>

          <h4>Changes to Terms</h4>
          <ul className={styles.list2}>
            <li>
              <b>Updates. </b>Roofbucks may update these terms. Users will be
              notified of changes, and continued use of the platform constitutes
              acceptance of the modified terms.
            </li>
          </ul>

          <h4>Governing Law</h4>
          <ul className={styles.list2}>
            <li>
              <b>Jurisdiction. </b>These terms are governed by and construed in
              accordance with the laws of [Jurisdiction], without regard to its
              conflict of law principles.
            </li>
          </ul>
        </div>

        <p style={{lineHeight: "1.5"}} >
          By accessing or using Roofbucks, you acknowledge that you have read,
          understood, and agree to be bound by these terms. If you do not agree
          with these terms, please do not use Roofbucks.{" "}
        </p>
      </div>
    </>
  );
};

export { TermsOfServiceUI };
