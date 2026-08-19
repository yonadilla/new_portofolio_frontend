"use client";

import "./footer.css";

export default function Footer() {


  return (
    <footer data-scroll-section className="footer_container">
      <div  className="footer_scroll">
        <div className="footer_nav">
          <div>
            <p>Explore</p>
          </div>
          <ul>
            <li>
              <a href="">Work</a>
            </li>
            <li>
              <a href="">AboutMe</a>
            </li>
          </ul>
        </div>
        <div className="footer_sosmed">
          <div>
            <p>Sosmed</p>
          </div>
          <ul>
            <li>
              <a href="">Linked</a>
            </li>
            <li>
              <a href="">Instagram</a>
            </li>
          </ul>
        </div>

        <div className="footer_addr_clock">
          <div className="footer_addr">
            <p>Blora, indonesia</p>
          </div>
          <div className="footer_clock">
            <p>20:41 AM</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
