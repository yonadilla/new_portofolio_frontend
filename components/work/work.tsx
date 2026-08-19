"use client";

import { useRef } from "react";
import WorkCard from "./components/workcard/workcard";
import "./work.css";
import { projects } from "@/data/data";
import useStack from "@/hooks/useStack";
import useElasticList from "@/hooks/useElasticList";

export default function Work() {

  const containerRef = useRef<HTMLDivElement>(null)

  useStack(containerRef , {
    itemClass : ".work_card_layout",
    innerClass : ".work_card_inner",
    outerClass : ".work_card_outer",
    ratio : 1 / 1.65
  })

  useElasticList(containerRef, {
    itemClass : ".work_card_layout",
    innerClass : ".work_card_inner",
    outerClass : ".work_card_outer",
  }
    
  )
  return (
    <div  className="work_container" >
      <h1 className="work_title">
        Project
      </h1>
      <div>
        <div className="work_list_wrapper" ref={containerRef} >
          {projects.map((project, i) => (
            <WorkCard
            key={i}
            href={project.href}
            img={project.img}
            subtitle={project.subtitle}
            tag={project.tag}
            title={project.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
