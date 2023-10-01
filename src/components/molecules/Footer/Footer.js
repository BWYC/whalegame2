import "./Footer.css";

const Footer = () => {
  return (
    <div className="copyright">
      GAME V1.2 Copyright © {new Date().getFullYear()}{" "}
      <a
        href="https://boredwhalesyachtclub.org/"
        target="_blank"
        rel="noreferrer"
        className="copyright-link"
      >
        BoredWhalesYachtClub
      </a>
    </div>
  );
};
export default Footer;
