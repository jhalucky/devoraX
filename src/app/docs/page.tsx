import React from "react";
import { headingFont } from "@/lib/fonts";

const docs = [
  {
    name: "Python Docs 🐍",
    link: "https://docs.python.org/3/",
    logo: "https://www.python.org/static/community_logos/python-logo.png",
  },
  {
    name: "C++ Docs 💻",
    link: "https://en.cppreference.com/w/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
  },
  {
    name: "JavaScript Docs 🌐",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
  },
  {
    name: "TypeScript Docs 📝",
    link: "https://www.typescriptlang.org/docs/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
  },
];

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-black text-white py-10 px-5">
      <h1 className={`text-4xl font-bold text-center mb-10 ${headingFont.className}`}>
        Official Documentation Links
      </h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">
        {docs.map((doc) => (
          <a
            key={doc.name}
            href={doc.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-xl shadow-md hover:shadow-xl transform transition hover:scale-105 h-72"
          >
            <img
              src={doc.logo}
              alt={doc.name}
              className="w-20 h-20 mb-4 object-contain"
            />
            <h2 className="text-2xl font-semibold">{doc.name}</h2>
            <p className="mt-2 text-sm text-gray-300 text-center">
              Click to open the official documentation
            </p>
          </a>
        ))}
      </div>
    </main>
  );
}

