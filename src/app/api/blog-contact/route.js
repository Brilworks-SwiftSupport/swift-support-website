import { NextResponse } from "next/server";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req, res) {
  if (req.method === "POST") {
    const payload = await req.json();
    const { name, email, message, page } = payload;

    try {
      const msg = {
        to: `${process.env.SENDGRID_DEFAULT_TO_EMAIL}`,
        from: `${process.env.SENDGRID_DEFAULT_FROM_EMAIL}`,
        subject: "SwiftSupport: Response from a contact form",
        text: "Contact form",
        html: `<body style="margin-top:20px">
        <table width="100%" border="0" cellspacing="20" cellpadding="0"
          style="background: #f9f9f9; max-width: 600px; border-radius: 10px;">
          <tr><td style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; margin:auto; text-align:center"><strong>SwiftSupport</strong></td></tr>
          <tr>
            <td
              style="padding: 10px 0px; font-size: 16px; font-family: Helvetica, Arial, sans-serif;">
                <p style="margin: 0"><strong>Name: </strong>${name}</p>
                <p style="margin: 0"> <strong>Email: </strong>${email}</p>
                <p style="margin: 0"> <strong>Path: </strong>${
                  process.env.NEXT_PUBLIC_BASE_URL
                }${page.slice(1)}</p>
                <p style="margin: 0"><strong>Message: </strong>${message}</p>
            </td>
          </tr>
        </table>
      </body>`,
      };
      await sgMail
        .send(msg)
        .then((data) => {
          return NextResponse.json(
            { message: "Email sent successfully" },
            { status: 200 }
          );
        })
        .catch((error) => {
          console.log("Email sent Failed-2");
          console.error(error);
          return NextResponse.json(
            { message: "Error sending email" },
            { status: 500 }
          );
        });
      return NextResponse.json(
        { message: "Form submitted successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error creating contact", error);
      return NextResponse.json(
        { message: "Error submitting form" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
}
