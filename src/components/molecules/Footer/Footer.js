import "./Footer.css";

const Footer = () => {
  return (
    <div className="copyright">
      Copyright © {new Date().getFullYear()}{" "}
      <a
        href="https://boredwhalesyachtclub.org/"
        target="_blank"
        rel="noreferrer"
        className="copyright-link"
      >
        Bored Whales Yacht Club
      </a>
    </div>
  );
};
export default Footer;
