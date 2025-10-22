import fs from "fs";
import csv from "csvtojson";

const inputFile = "src/data/leetcode_problems.csv";
const outputFile = "src/data/leetcode_problems.json";

csv()
  .fromFile(inputFile)
  .then((jsonObj) => {
    const cleaned = jsonObj.map((p, i) => ({
      id: p.title_slug || `problem-${i}`,
      title: p.title || "Untitled Problem",
      difficulty: p.difficulty || "Easy",
      topics: p.tags ? p.tags.split(",").map((t) => t.trim()) : [],
      description: p.description || "No description available.",
      starterCode: {
        python: p.python_snippet || "",
        cpp: p.cpp_snippet || "",
        js: p.js_snippet || "",
      },
    }));

    fs.writeFileSync(outputFile, JSON.stringify(cleaned, null, 2));
    console.log(`✅ Converted ${cleaned.length} problems to JSON.`);
  })
  .catch((err) => console.error("Error converting CSV:", err));
