import type { ActionArgs } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { Form } from "@remix-run/react";

export async function action(args: ActionArgs) {
  const data = await args.request.formData();
  return data.get("action") === "redirect"
    ? redirect("/external", { reloadDocument: true })
    : null;
}

export default function Index() {
  return (
    <Form method="post" action="/?index">
      <input type="submit" name="action" value="ignore" />
      <input type="submit" name="action" value="redirect" />
    </Form>
  );
}
