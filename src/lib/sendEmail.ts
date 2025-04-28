"use server";

import { Resend } from "resend";
import { emailTypes, getTemplateEmail } from "../../emails/verification";

export const sendEmail = async ({
  email,
  token,
  variation,
}: {
  email: string;
  token: string;
  variation: emailTypes;
}) => {
  if (!process.env.RESEND_API_KEY) console.error("No API Key");

  if (!email) return;

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { subject, html } = getTemplateEmail({
    token,
    localEnv: process.env.NODE_ENV,
    variation,
  });

  try {
    const sentEmail = await resend.emails.send({
      from: "trigo@otrigo.com",
      to: email,
      subject,
      html,
    });

    if (!sentEmail) return { error: "Couldn't send an email" };
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};
