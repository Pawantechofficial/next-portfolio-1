"use client";
import React, { useState, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
// import GithubIcon from "../../../public/github-icon.svg";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const EmailSection = () => {
  const [state, handleSubmit] = useForm("xvoezley");
  if (state.succeeded) {
    Swal.fire({
      title: "Thanks!",
      text: "Your message sent successfully!",
      icon: "success",
    });
  }
  return (
    <section className="text-white py-24 min-h-screen" id="contact">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        Contact Me
      </h2>
      <div className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative">
        {/* <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div> */}
        <div className="z-10">
          <h5 className="text-xl font-bold text-white my-2">
            Let&apos;s Connect
          </h5>
          <p className="text-[#ADB7BE] mb-4 max-w-md">
            {" "}
            I&apos;m currently looking for new opportunities, my inbox is always
            open. Whether you have a question or just want to say hi, I&apos;ll
            try my best to get back to you!
          </p>
          <div className="socials flex flex-row gap-2 mb-8 justify-center sm:justify-start mt-8 sm:mt-16">
            <Link href="https://github.com/Pawantechofficial">
              <FaGithub className="text-white w-11 h-11 ml-2 mr-2 " />
            </Link>
            <Link href="https://www.linkedin.com/in/pawanofficial/">
              <FaLinkedinIn className="text-white w-11 h-11  ml-2 mr-2" />
            </Link>
            <Link href="https://www.instagram.com/pawanofficial07">
              <FaInstagram className="text-white w-11 h-11  ml-2 mr-2" />
            </Link>
            <Link href="https://www.facebook.com/profile.php?id=100016918660317">
              <FaFacebook className="text-white w-11 h-11  ml-2 mr-2" />
            </Link>
          </div>
        </div>
        <div>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="fullname"
                className="text-white block mb-2 text-sm font-medium"
              >
                Full Name
              </label>
              <input
                name="fullName"
                type="text"
                id="fullname"
                rows={1}
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Pawan Rai"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="text-white block mb-2 text-sm font-medium"
              >
                Your Email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                rows={1}
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="text-white block text-sm mb-2 font-medium"
              >
                Subject
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                rows={1}
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Just saying hi"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="text-white block text-sm mb-2 font-medium"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                rows={6}
                className="bg-[#18191E] border resize-none border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="Let's talk about..."
              />
            </div>
            <button
              type="submit"
              disabled={state.submitting}
              className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-5 rounded-lg w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EmailSection;
