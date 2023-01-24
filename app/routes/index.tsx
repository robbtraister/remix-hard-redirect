import type { ActionArgs} from "@remix-run/node";
import { redirect} from "@remix-run/node";
import { Form } from "@remix-run/react";

export async function action(args: ActionArgs) {
  const data = await args.request.formData();
  return data.get("action") === "redirect" ? redirect("/external", {
    headers: {
      "X-Remix-Hard-Redirect": "true"
    }
  }) : null;
}

export default function Index() {
  return (
    <Form method="post" action="/?index">
      <input type="submit" name="action" value="ignore" />
      <input type="submit" name="action" value="redirect" />
    </Form>
  );
}
