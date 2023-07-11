import type { ActionArgs } from "@remix-run/server-runtime";
import { redirect } from "@remix-run/server-runtime";
import { Form } from "@remix-run/react";

const redirectWithReload = (url: string, init?: number | ResponseInit | undefined) => {
  if (typeof init !== "number") {
    init ||= {};
    init.headers = new Headers(init.headers);
    init.headers.set("X-Remix-Reload-Document", "true");
  }
  return redirect(url, init);
}

export async function action(args: ActionArgs) {
  const data = await args.request.formData();
  return data.get("action") === "redirect"
    ? redirectWithReload("/external")
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
