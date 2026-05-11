import { SITE_NAME } from "../../lib/consts.ts";

import "./Page404.css";
import Page from "../../components/Page/Page.tsx";
import { Button } from "react-bootstrap";

export default function Page404() {
  return (
    <Page
      title={SITE_NAME + "- 404 Not Found"}
      noindex={true}
      canonical="https://thisshopissogay.com/404"
      id="content-404"
    >
      <h1>404</h1>
      <p>We couldn't find that page :(</p>
      <Button href="/" variant={"outline-primary"} size="lg">
        Return Home
      </Button>
    </Page>
  );
}
