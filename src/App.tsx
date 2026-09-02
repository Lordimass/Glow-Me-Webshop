import { BrowserRouter, Routes } from "react-router-dom";
import { StrictMode } from "react";
import {
  initGA4,
  LRC,
  LRCContext,
  useConsentMode,
} from "lordis-react-components";
import { SITE_NAME } from "./lib/consts.ts";
import { usePageViewTracking, useSiteSettings } from "./AppHooks.tsx";
import { SupabaseClient } from "@supabase/supabase-js";

initGA4(
  import.meta.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
  import.meta.env.NEXT_PUBLIC_ENVIRONMENT === "DEVELOPMENT",
);

// @ts-ignore
LRC.supabase = new SupabaseClient(
  import.meta.env.NEXT_PUBLIC_SUPABASE_DATABASE_URL,
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default function App() {
  return (
    <BrowserRouter>
      <LRCContext getLRCRemoteSettingsHook={useSiteSettings}>
        <Inner />
      </LRCContext>
    </BrowserRouter>
  );
}

function Inner() {
  useConsentMode();
  usePageViewTracking();

  return (
    <>
      <meta name="author" content="Sam Knight" />
      <meta name="author" content="Lordimass" />
      <meta name="creator" content="Sam Knight" />
      <meta name="creator" content="Lordimass" />
      <meta name="generator" content="react" />
      <title>{SITE_NAME}</title>
      <StrictMode>
        <Routes>
          {/*<Route index element={<Home />} />*/}
          {/*<Route path={"/GHOSTS"} element={<GHOSTS />} />*/}
          {/*<Route path={"/CATS"} element={<CATS />} />*/}
          {/*<Route path="/checkout" element={<Checkout />} />*/}
          {/*<Route path="/thankyou" element={<ThankYou />} />*/}
          {/*<Route path="/products/*" element={<ProductPage />} />*/}
          {/*<Route path="/tag/*" element={<TagPage />} />*/}
          {/*<Route path="*" element={<Page404 />} />*/}

          {/*<Route*/}
          {/*  path={"privacy"}*/}
          {/*  element={*/}
          {/*    <Policy*/}
          {/*      file_name="privacy-policy"*/}
          {/*      title="Privacy Policy"*/}
          {/*      canonical="privacy"*/}
          {/*    />*/}
          {/*  }*/}
          {/*/>*/}
          {/*<Route*/}
          {/*  path={"refunds"}*/}
          {/*  element={*/}
          {/*    <Policy*/}
          {/*      file_name="returns"*/}
          {/*      title="Refunds & Returns Policy"*/}
          {/*      canonical="returns"*/}
          {/*    />*/}
          {/*  }*/}
          {/*/>*/}
          {/*<Route*/}
          {/*  path={"returns"}*/}
          {/*  element={*/}
          {/*    <Policy*/}
          {/*      file_name="returns"*/}
          {/*      title="Refunds & Returns Policy"*/}
          {/*      canonical="returns"*/}
          {/*    />*/}
          {/*  }*/}
          {/*/>*/}
          {/*<Route*/}
          {/*  path={"cancellations"}*/}
          {/*  element={*/}
          {/*    <Policy*/}
          {/*      file_name="cancellation"*/}
          {/*      title="Cancellation Policy"*/}
          {/*      canonical="cancellation"*/}
          {/*    />*/}
          {/*  }*/}
          {/*/>*/}
          {/*<Route*/}
          {/*  path={"/shipping"}*/}
          {/*  element={*/}
          {/*    <Policy*/}
          {/*      file_name="shipping"*/}
          {/*      title="Shipping Policy"*/}
          {/*      canonical="shipping"*/}
          {/*    />*/}
          {/*  }*/}
          {/*/>*/}
        </Routes>
      </StrictMode>
    </>
  );
}
