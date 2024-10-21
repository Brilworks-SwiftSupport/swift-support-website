import { NextResponse } from "next/server";
import { sendDataToSlack } from "..";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req, res) {
  if (req.method === "POST") {
    const payload = await req.json();

    try {
      await sendDataToSlack(payload);
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
