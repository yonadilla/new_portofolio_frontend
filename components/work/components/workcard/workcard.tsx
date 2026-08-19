"use client";

import Image from "next/image";
import "./workcard.css";
import { useRef } from "react";

type WorkCardProps = {
  title: string;
  subtitle: string;
  tag: string;
  img: string;
  href: string;
};

export default function WorkCard({ href, img, subtitle, tag, title }: WorkCardProps) {
  const cardRef = useRef<HTMLDivElement>(null); 

  return (
    <div className="work_card_layout" ref={cardRef}> 
      <div
        className="work_card_outer"
      >
        <div
          className="work_card_inner"
        >
          <article className="work_card_thumb">
            <div className="work_card_thumb_content">
              <h2 className="work_card_thumb_title">{title}</h2>
              <span className="work_card_thumb_subtitle">{subtitle}</span>
              <span className="work_card_thumb_tag">{tag}</span>
            </div>

            <a href={href} className="work_card_thumb_link">
              <span className="work_view_project">View Project</span>
            </a>

            <figure className="project_img_wrapper">
              <Image
                src={img}
                alt={title}
                width={800}
                height={600}
                className="project_img"
                priority
              />
            </figure>
          </article>
        </div>
      </div>
    </div>
  );
}