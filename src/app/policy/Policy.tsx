"use client";

import "./global.css";
import { useEffect, useState } from "react";
import { SUPABASE_STORAGE } from "../../lib/assets.ts";
import Page from "../../components/Page/Page.tsx";
import { SITE_NAME } from "../../lib/consts.ts";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

export default function Policy({
  file_name,
  title,
  canonical,
}: {
  file_name: string;
  title: string;
  canonical: string;
}) {
  const [md, setMd] = useState<string | null>(null);
  useEffect(() => {
    async function getPolicy() {
      const resp = await fetch(SUPABASE_STORAGE + `/policies//${file_name}.md`);
      setMd(await resp.text());
    }
    getPolicy().then();
  }, []);

  return (
    <Page
      title={SITE_NAME + " - " + title}
      canonical={"https://thisshopissogay.com/" + canonical}
    >
      <div className="policy neon-border">
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
          {md}
        </Markdown>
      </div>
    </Page>
  );
}
