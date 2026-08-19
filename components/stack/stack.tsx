import React from "react";
import Card from "./components/card";
import "./stack.css"

const stackFrontend = ["HTML", "CSS", "React", "Next"];

export default function Stack() {
  return (
    <div className="stack_container">
        <p>What i can do it </p>
      <Card
        TitleStack="Front End Developer"
        StackOverview="aku suka membuar hal hal yang menarik di mata"
        Stack={stackFrontend}
        className="bg-green-400"
      />

      <Card
        TitleStack="Front End Developer"
        StackOverview="aku suka membuar hal hal yang menarik di mata"
        Stack={stackFrontend}
        className=""
      />
      <Card
        TitleStack="Front End Developer"
        StackOverview="aku suka membuar hal hal yang menarik di mata"
        Stack={stackFrontend}
        className="bg-amber-400"
      />
    </div>
  );
}
