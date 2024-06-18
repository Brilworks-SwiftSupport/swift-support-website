import Link from "next/link";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto lg:w-4/5 privacy-tnc">
      <div className="section-padding lg:!pt-[120px] slg:!pb-[3.25rem] !pt-[90px]">
        <h1 className="xl:text-5xl md:text-4xl text-3xl font-semibold mb-4">
          Privacy Policy
        </h1>
        <p>
          Welcome to{" "}
          <Link
            className="hover:bg-lightGray hover:bg-opacity-50 underline"
            href="https://www.swiftsupport.ai/"
          >
            Swiftsupport.ai
          </Link>{" "}
          ("we", "our", "us"). We are committed to protecting your privacy and
          ensuring that your personal information is handled in a safe and
          responsible manner. This Privacy Policy outlines how we collect, use,
          and protect your information when you use our services, including our
          chatbot and website.
        </p>
        <br />
        <span className="font-semibold text-2xl">Information We Collect</span>
        <p className="mt-2">
          We collect various types of information in order to provide and
          improve our services to you:
        </p>
        <ol className="list-inside list-decimal mb-4">
          <li>
            <strong>Personal Information:</strong>
          </li>
          <ul className="list-outside list-disc pl-12">
            <li>
              <strong>Account Information:</strong> When you sign up for our
              services, we may collect personal details such as your name, email
              address, phone number, and other contact details.
            </li>
            <li>
              <strong>Profile Information:</strong> Information you provide when
              creating a profile, such as a username, photo, and preferences.
            </li>
          </ul>

          <li>
            <strong>Usage Data:</strong>
          </li>
          <ul className="list-outside list-disc pl-12">
            <li>
              <strong>Service Usage:</strong> Information on how you interact
              with our chatbot and website, including the pages you visit, the
              time and date of your visits, and other diagnostic data.
            </li>
            <li>
              <strong>Log Data:</strong> Automatically collected information
              when you access our services, including IP addresses, browser
              type, internet service provider, referring/exit pages, and
              date/time stamps.
            </li>
          </ul>

          <li>
            <strong>Cookies and Tracking Technologies:</strong>
          </li>
          <ul className="list-outside list-disc pl-12">
            <li>
              <strong>Cookies:</strong> Small files stored on your device to
              collect standard internet log information and visitor behavior
              information. You can instruct your browser to refuse all cookies
              or to indicate when a cookie is being sent.
            </li>
          </ul>
        </ol>

        <span className="font-semibold text-2xl">
          How We Use Your Information
        </span>
        <p className="mt-2">
          We use the information we collect in the following ways:
        </p>
        <ol className="list-inside list-decimal mb-4">
          <li>
            <strong>To Provide and Maintain Our Service:</strong> Ensuring that
            the service operates smoothly and efficiently.
          </li>
          <li>
            <strong>To Improve Our Service:</strong> Analyzing usage data to
            enhance the functionality and user experience.
          </li>
          <li>
            <strong>To Communicate with You:</strong> Sending notifications,
            updates, and other information related to our services.
          </li>
          <li>
            <strong>To Enhance Security:</strong> Monitoring and analyzing
            activity to detect, prevent, and address technical issues and
            unauthorized access.
          </li>
          <li>
            <strong>Marketing and Promotions:</strong> With your consent, we may
            send you information about promotions, offers, and news about our
            services.
          </li>
        </ol>

        <span className="font-semibold text-2xl">
          Data Sharing and Disclosure
        </span>
        <p className="mt-2">
          We respect your privacy and do not share your personal information
          with third parties, except in the following circumstances:
        </p>
        <ol className="list-inside list-decimal mb-4">
          <li>
            <strong>With Your Consent:</strong> We may share your information
            with third parties if you give us explicit permission.
          </li>
          <li>
            <strong>Service Providers:</strong> We employ third-party companies
            and individuals to facilitate our service, provide the service on
            our behalf, perform service-related tasks, or assist us in analyzing
            how our service is used.
          </li>
          <li>
            <strong>Legal Obligations:</strong> We may disclose your information
            to comply with legal requirements, court orders, or governmental
            requests.
          </li>
        </ol>

        <span className="font-semibold text-2xl">Data Security</span>
        <p className="mt-2 mb-4">
          We take the security of your data seriously and implement appropriate
          technical and organizational measures to protect your personal
          information. This includes using encryption and other security
          technologies. However, please note that no method of transmission over
          the internet or electronic storage is 100% secure.
        </p>

        <span className="font-semibold text-2xl">Your Rights</span>
        <p className="mt-2">You have the right to:</p>
        <ol className="list-inside list-decimal mb-4">
          <li>
            <strong>Access Your Data:</strong> Request a copy of the personal
            information we hold about you.
          </li>
          <li>
            <strong>Correct Your Data:</strong> Request correction of any
            inaccurate or incomplete information.
          </li>
          <li>
            <strong>Delete Your Data:</strong> Request deletion of your personal
            information.
          </li>
          <li>
            <strong>Restrict Processing:</strong> Request restriction of our
            processing of your personal information.
          </li>
          <li>
            <strong>Data Portability:</strong> Request transfer of your data to
            another service provider.
          </li>
          <li>
            <strong>Withdraw Consent:</strong> Withdraw your consent to our
            processing of your personal information at any time.
          </li>
        </ol>
        <p>
          To exercise any of these rights, please contact us at&nbsp;
          <Link
            className="hover:bg-lightGray hover:bg-opacity-50 underline"
            href="mailto:support@swiftsupport.ai"
          >
            support@swiftsupport.ai
          </Link>
        </p>

        <span className="font-semibold text-2xl">
          Changes to This Privacy Policy
        </span>
        <p className="mt-2 mb-4">
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page and
          updating the "effective date" at the top.
        </p>

        <span className="font-semibold text-2xl">Contact Us</span>
        <p className="mt-2 mb-4">
          If you have any questions about this Privacy Policy, please contact us
          at{" "}
          <Link
            className="hover:bg-lightGray hover:bg-opacity-50 underline"
            href="mailto:support@swiftsupport.ai"
          >
            support@swiftsupport.ai
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
