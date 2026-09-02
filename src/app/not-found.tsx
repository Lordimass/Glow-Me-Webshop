"use client";

import { SITE_NAME } from "../lib/consts.ts";

import "./not-found.css";
import PageComp from "../components/Page/Page.tsx";
import { Button } from "react-bootstrap";

export default function Page() {
  return (
    <PageComp
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
    </PageComp>
  );
}
