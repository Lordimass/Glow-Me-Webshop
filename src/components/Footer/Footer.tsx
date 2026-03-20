import "./Footer.scss";

export default function Footer() {
  // Include credit to Abelardo Gonzalez OpenDyslexic font https://iumlpfiybqlkwoscrjzt.supabase.co/storage/v1/object/public/other-assets/Glow%20Me!/open_dyslexic/README.txt
  return (
    <div className="footer">
      <p>
        Website made by <a href="https://lordimass.net">Sam Knight</a> <br />
      </p>
      {/* TODO: Policies */}
      {/*<p className="footer-policy-links">*/}
      {/*  <a href={getPath("PRIVACY_POLICY")}>Privacy Policy</a><span className="policy-separator" aria-hidden="true">/</span>*/}
      {/*  <a href={getPath("RETURNS_POLICY")}>Refund and Return Policy</a><span className="policy-separator" aria-hidden="true">/</span>*/}
      {/*  <a href={getPath("CANCELLATIONS_POLICY")}>Cancellation Policy</a><span className="policy-separator" aria-hidden="true">/</span>*/}
      {/*  <a href={getPath("SHIPPING_POLICY")}>Shipping Policy</a>*/}
      {/*</p>*/}
      {/*<br />*/}

      <p className="additional-links">
        <a href="https://www.instagram.com/yorkghostshop/" target="_blank">
          Instagram
        </a>{" "}
        <span className="policy-separator" aria-hidden="true">
          /
        </span>
        <a href="https://www.tiktok.com/@yorkghostshop" target="_blank">
          TikTok
        </a>{" "}
        <span className="policy-separator" aria-hidden="true">
          /
        </span>
        <a href="https://www.facebook.com/YorkGhostShop" target="_blank">
          Facebook
        </a>{" "}
        <span className="policy-separator" aria-hidden="true">
          /
        </span>
        <a href="https://x.com/YorkGhostShop" target="_blank">
          Twitter
        </a>{" "}
        <br />
      </p>
      <br />
      <br />

      <p className="footer-company-information">
        <Copyright />
        <span className="policy-separator" aria-hidden="true">
          /
        </span>
        <span>Company No. 15502638</span>
        <span className="policy-separator" aria-hidden="true">
          /
        </span>
        <span>
          Registered in England & Wales 74 Low Petergate, York, YO1 7HZ
        </span>
        <span className="policy-separator" aria-hidden="true">
          /
        </span>
        <span>Contact: support@thisshopissogay.com</span>
      </p>
    </div>
  );
}

function Copyright() {
  return (
    <>
      {"\u00A9"} {/* <- Copyright character */} 2026{" "}
      <a href="https://lordimass.net">Sam Knight</a>. Licensed exclusively to{" "}
      <a href="https://find-and-update.company-information.service.gov.uk/company/15502638">
        Xefra Ltd.
      </a>
    </>
  );
}
