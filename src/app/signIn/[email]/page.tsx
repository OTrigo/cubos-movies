import ResendForm from "./ResendForm";

const UnverifiedEmailPage = async ({
  params,
}: {
  params: Promise<{ email: string }>;
}) => {
  const { email } = await params;

  return (
    <>
      <ResendForm email={email} />
    </>
  );
};

export default UnverifiedEmailPage;
