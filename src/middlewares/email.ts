import iEmailSchema, { IEmail } from "../schema/email";
import { fromZodError } from "zod-validation-error";
export type EmailRequest = Request & {
  email?: IEmail;
};

/**
 * Middleware to validate the request body against the email schema
 * @param request
 * @constructor
 */
const EmailSchemaMiddleware = async (request: EmailRequest) => {
  const content = await request.json();
  const email = iEmailSchema.safeParse(content);
  if (!email.success) {
    return new Response("Bad Request - " + fromZodError(email.error), {
      status: 400,
    });
  }
  request.email = email.data;
  return;
};

export default EmailSchemaMiddleware;
