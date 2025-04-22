import React from "react";
import { FaGithub, FaEnvelope, FaCodepen, FaLinkedin } from "react-icons/fa";
import { SiNextdotjs } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="border-t border-light border-opacity-20 bg-gradient-to-t from-black to-transparent">
      <div className="max-w-3xl mx-auto py-6 flex flex-col items-center space-y-4">
        {/* Icônes de réseaux */}
        <div className="flex justify-center space-x-6">
          <a
            href="https://github.com/Cyril-Dias"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition"
            aria-label="GitHub"
          >
            <FaGithub className="text-2xl text-white" />
          </a>
          <a
            href="https://www.linkedin.com/in/cyril-dias/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full hover:bg-white hover:bg-opacity-10 transition"
            aria-label="LinkedIn"
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

        {/* Crédit et Made with Next.js */}
        <div className="flex items-center space-x-2 text-sm text-light/80">
          <span>© 2025 Cyril Dias Web Development</span>
          <span>•</span>
          <span>Made with</span>
          <a
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:opacity-80 transition"
            aria-label="Next.js"
          >
            <SiNextdotjs className="text-2xl text-white mr-1" />
            <span className="underline">Next.js</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
