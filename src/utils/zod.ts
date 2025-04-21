import { z } from "zod";

export const UserLoginSchema = z.object({
  emailOrName: z.string().nonempty("Name or Email is required."),
  password: z.string().nonempty("Password is required."),
});

export const errorAccumulator = (form: z.SafeParseError<unknown>) => {
  return form.error.errors.reduce(
    (accumulatedErrors, currentError) => {
      const fieldName = currentError.path[0];
      const errorMessage = currentError.message;

      accumulatedErrors[fieldName] = errorMessage;
      return accumulatedErrors;
    },
    {} as Record<string, string>
  );
};
