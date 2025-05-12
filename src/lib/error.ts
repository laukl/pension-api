import { ZodIssue } from "zod";

export class ValidationError extends Error {
  constructor(issues: ZodIssue[]) {
    const message = issues
      .map((issue) => `${issue.message} at '${issue.path.join("/")}'`)
      .join("; ");
    super(message);
    this.name = "ValidationError";
  }
}
