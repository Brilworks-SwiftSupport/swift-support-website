import Link from "next/link";
import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="container mx-auto lg:w-4/5 privacy-tnc">
      <div className="section-padding lg:!pt-[120px] slg:!pb-[3.25rem] !pt-[90px]">
        <h1 className="xl:text-5xl md:text-4xl text-3xl font-semibold mb-4">
          Terms and Conditions
        </h1>
        <p className="mb-4">
          Welcome to&nbsp;
          <Link
            className="hover:bg-lightGray hover:bg-opacity-50 underline"
            href="https://www.swiftsupport.ai/"
          >
            swiftsupport.ai
          </Link>
          &nbsp; ("we", "our", "us"). By accessing or using our services, you
          agree to comply with and be bound by these Terms of Service. If you
          disagree with any part of these terms, you may not use our services.
        </p>
        <span className="font-semibold text-2xl">Use of Services</span>
        <ul className="list-outside list-disc pl-5 pt-2 pb-4">
          <li>
            <strong>Eligibility:</strong> You must be at least 18 years old to
            use our services. By using our services, you represent and warrant
            that you meet this age requirement.
          </li>
          <li>
            <strong>Account Responsibility:</strong> You are responsible for
            maintaining the confidentiality of your account information,
            including your password. You agree to accept responsibility for all
            activities that occur under your account.
          </li>
          <li>
            <strong>Prohibited Activities:</strong> You agree not to use our
            services for any unlawful purpose or to engage in any activity that
            could harm our services or reputation. This includes, but is not
            limited to, uploading harmful or malicious content, infringing on
            the intellectual property rights of others, or engaging in any
            fraudulent activity.
          </li>
        </ul>
        <span className="font-semibold text-2xl">Intellectual Property</span>
        <p className="mb-4 pt-2">
          All content and materials on&nbsp;
          <Link
            className="hover:bg-lightGray hover:bg-opacity-50 underline"
            href="https://www.swiftsupport.ai/"
          >
            swiftsupport.ai
          </Link>
          &nbsp; , including text, graphics, logos, and software, are the
          property of&nbsp;
          <Link
            className="hover:bg-lightGray hover:bg-opacity-50 underline"
            href="https://www.swiftsupport.ai/"
          >
            swiftsupport.ai
          </Link>
          &nbsp; or its licensors and are protected by copyright, trademark, and
          other intellectual property laws. You may not use, reproduce, or
          distribute any content from our service without our prior written
          permission.
        </p>
        <span className="font-semibold text-2xl">User Content</span>
        <ul className="list-outside list-disc pl-5 pt-2 pb-4">
          <li>
            <strong>Responsibility:</strong> You are responsible for any content
            you post or transmit through our services. You grant&nbsp;
            <Link
              className="hover:bg-lightGray hover:bg-opacity-50 underline"
              href="https://www.swiftsupport.ai/"
            >
              swiftsupport.ai
            </Link>
            &nbsp; a non-exclusive, royalty-free, perpetual, and worldwide
            license to use, reproduce, modify, and distribute such content.
          </li>
          <li>
            <strong>Prohibited Content:</strong> You agree not to post or
            transmit content that is unlawful, harmful, defamatory, obscene, or
            otherwise objectionable.
          </li>
        </ul>
        <span className="font-semibold text-2xl">Termination</span>
        <p className="mb-4 pt-2">
          We reserve the right to terminate or suspend your account at any time,
          without notice, if you violate these Terms of Service or engage in
          conduct that we believe is harmful to other users or our services.
          Limitation of Liability.
        </p>
        <span className="font-semibold text-2xl">Limitation of Liability</span>
        <p className="mb-4 pt-2">
          To the fullest extent permitted by applicable law,&nbsp;
          <Link
            className="hover:bg-lightGray hover:bg-opacity-50 underline"
            href="https://www.swiftsupport.ai/"
          >
            swiftsupport.ai
          </Link>
          &nbsp; shall not be liable for any direct, indirect, incidental,
          special, or consequential damages resulting from your use of our
          services, even if we have been advised of the possibility of such
          damages. This includes, but is not limited to, damages for loss of
          profits, data, or other intangible losses.
        </p>
        <span className="font-semibold text-2xl">Governing Law</span>
        <p className="mb-4 pt-2">
          These Terms of Service shall be governed by and construed in
          accordance with the laws of India, without regard to its conflict of
          law principles.
        </p>

        <span className="font-semibold text-2xl">Dispute Resolution</span>
        <ul className="list-outside list-disc pl-5 pt-2 pb-4">
          <li>
            <strong>Negotiation:</strong> In the event of a dispute, the parties
            agree to attempt to resolve the dispute through informal negotiation
            first.
          </li>
          <li>
            <strong>Arbitration:</strong> If the dispute cannot be resolved
            through negotiation, it shall be resolved through binding
            arbitration in accordance with the rules of the Indian Council of
            Arbitration (ICA).
          </li>
        </ul>

        <span className="font-semibold text-2xl">Changes to These Terms</span>
        <p className="mb-4 pt-2">
          We may modify these Terms of Service at any time. We will notify you
          of any changes by posting the new Terms of Service on our website and
          updating the "effective date" at the top. Your continued use of our
          services after any such changes constitutes your acceptance of the new
          Terms of Service.
        </p>
        <span className="font-semibold text-2xl">Contact Us</span>
        <p className="mb-4 pt-2">
          If you have any questions about these Terms of Service, please contact
          us at&nbsp;
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

export default TermsAndConditions;
