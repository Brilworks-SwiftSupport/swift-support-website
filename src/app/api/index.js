import { NextResponse } from "next/server";
import axios from "axios";

export async function sendDataToSlack(payload) {
  const { name, workEmail, phone, companyName, message } = payload;

  const data = {
    channel: process.env.SLACK_CHANNEL_ID,
    blocks: [
      {
        type: "rich_text",
        elements: [
          {
            type: "rich_text_section",
            elements: [
              {
                type: "text",
                text: "\nEmail: ",
              },
              {
                type: "link",
                url: "mailto:" + `${workEmail || ""}`,
                text: `${workEmail || ""}`,
              },
              {
                type: "text",
                text: `\nName: ${name || ""}\nCompany: ${
                  companyName || ""
                }\nPhone: ${phone || ""}\nMessage: ${message || ""}`,
              },
            ],
          },
        ],
      },
    ],
  };
  const headers = {
    Authorization: `Bearer ${process.env.SLACK_TOKEN}`,
    "Content-Type": "application/json; charset=utf-8",
  };

  try {
    const response = await axios.post(`${process.env.SLACK_URL}`, data, {
      headers,
    });
    const responseData = response.data;
    if (!responseData.ok) {
      console.error(`Error: ${responseData.error}`);
      return NextResponse.json({ message: responseData.error });
    } else {
      return NextResponse.json({ data: responseData }, { status: 200 });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred while sending the message to Slack." },
      { status: 500 }
    );
  }
}
