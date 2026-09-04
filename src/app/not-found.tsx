"use client";

import { SITE_NAME } from "../lib/consts";

import "./not-found.css";
import { Button } from "react-bootstrap";

export default function Page() {
  return (
    <>
      <h1>404</h1>
      <p>We couldn't find that page :(</p>
      <Button href="/" variant={"outline-primary"} size="lg">
        Return Home
      </Button>
    </>
  );
}
