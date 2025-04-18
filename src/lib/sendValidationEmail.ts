import { Resend } from "resend";
import { VerificationTemplate } from "../../emails/verification";

export const sendValidationEmail = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  if (!process.env.RESEND_API_KEY) console.error("No API Key");

  if (!email) return;

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const sentEmail = resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Seja bem vindo ao Cubos Movies!",
      html: VerificationTemplate({
        verificationToken: token,
        localEnv: process.env.NODE_ENV,
      }),
    });

    if (!sentEmail) return { error: "Couldn't send an email" };
    return { success: true };
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};
