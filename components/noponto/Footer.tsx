import { assetPath } from "@/lib/asset-path";
import { siteLinks } from "@/content/links";
import copy from "@/content/copy.json";
export default function Footer() {
  return (
    <footer className="footer dark" data-fold="13">
      <div className="container">
        <div className="footer-top">
          <a href="#inicio" aria-label="NoPonto — início">
            <img
              src={assetPath("/brand/logo-light.png")}
              width="757"
              height="130"
              alt="noponto."
            />
          </a>
          <p>{copy[13][1]}</p>
          <p>{copy[13][2]}</p>
        </div>
        <div className="footer-bottom">
          <p>{copy[13][3]}</p>
          <div className="socials">
            {siteLinks.instagram ? (
              <a
                href={siteLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            ) : (
              <span>Instagram</span>
            )}
            <i>·</i>
            {siteLinks.linkedin ? (
              <a
                href={siteLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            ) : (
              <span>LinkedIn</span>
            )}
            <i>·</i>
            {siteLinks.whatsapp ? (
              <a
                href={siteLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            ) : (
              <span>WhatsApp</span>
            )}
          </div>
          <p>{copy[13][5]}</p>
        </div>
      </div>
    </footer>
  );
}
