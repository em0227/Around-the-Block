import React from "react";
import { RiDivideLine } from "react-icons/ri";
import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-title">
        <p
          id="developer"
          style={{ textAlign: "center", paddingTop: 20, fontSize: "16px" }}
        >
          © 2021 Designed and Developed by Around the Block Team
        </p>
      </div>
      <div className="footer-member">
        <div className="member">
          <img
            className="footer-img"
            src="https://atb-photos.s3.amazonaws.com/emily.png"
            alt=""
          />

          <div className="footer-link">
            <a
              className="contact_github"
              href="https://github.com/em0227"
              target="_blank"
            >
              Github
            </a>

            <a
              className="contact_linkedin"
              href="https://www.linkedin.com/in/emilyawu/"
              target="_blank"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <div className="member">
          <a href="https://feifeiyang-swe.com/">
            <img
              className="footer-img"
              src="https://atb-photos.s3.amazonaws.com/feifei_headshot.JPG"
              alt=""
            />
          </a>

          <div className="footer-link">
            <a
              className="contact_github"
              href="https://github.com/Feifeiyang5177"
              target="_blank"
            >
              Github
            </a>

            <a
              className="contact_linkedin"
              href="https://www.linkedin.com/in/feifei-yang-6990bb38/"
              target="_blank"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="member">
       
          <img
            className="footer-img"
            src="https://atb-photos.s3.amazonaws.com/sigdha.png"
            alt=""
          />
      

          <div className="footer-link">
            <a
              className="contact_github"
              href="https://github.com/snigdhabanda"
              target="_blank"
            >
              Github
            </a>

            <a
              className="contact_linkedin"
              href="https://www.linkedin.com/in/snigdhabanda0/"
              target="_blank"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="member">
        <a href="https://meeke198.github.io" >
          <img
            className="footer-img"
            src="https://atb-photos.s3.amazonaws.com/hien.png"
            alt=""
          />
          </a>

          <div className="footer-link">
            <a
              className="contact_github"
              href="https://github.com/meeke198"
              target="_blank"
            >
              Github
            </a>

            <a
              className="contact_linkedin"
              href="https://www.linkedin.com/in/hien-nguyen-a7045b70/"
              target="_blank"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
