import "./Footer.css";

export const Footer = () => {
  return (
    <div className="copyright">Copyright © {new Date().getFullYear()} {" "}
      <a href="https://berthutapea.vercel.app/" target="_blank" rel="noreferrer" className="copyright-link">Gilbert Hutapea</a>
    </div>
  )
}
