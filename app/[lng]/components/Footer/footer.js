import React from "react";
import { FaGithub, FaEnvelope, FaCodepen, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-light border-opacity-20 bg-gradient-to-t from-black to-transparent">
      <div className="max-w-3xl mx-auto py-6 flex justify-center space-x-6">
        <a
          href="https://github.com/Cyril-Dias"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:cursor-pointer transition"
          aria-label="GitHub"
        >
          <FaGithub className="text-2xl text-white" />
        </a>
        <a
          href="https://www.linkedin.com/in/cyril-dias/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:cursor-pointer transition"
          aria-label="GitHub"
        >
          <FaLinkedin className="text-2xl text-white" />
        </a>
        <a
          href="https://codepen.io/Cyril-Dias"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition"
          aria-label="CodePen"
        >
          <FaCodepen className="text-2xl text-white" />
        </a>
        <a
          href="mailto:cyril.dias-senden@hotmail.fr"
          className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition"
          aria-label="Email"
        >
          <FaEnvelope className="text-2xl text-white" />
        </a>
      </div>
    </footer>
  );
}
