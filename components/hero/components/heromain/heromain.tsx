import RevealTextAnimation from "@/components/revealTextAnimation";
import "./heromain.css";

export default function Heromain() {
  return (
    <div className="hero_main">
      <RevealTextAnimation animatedOnScroll = {false} >
        <p className="hero">A person want to create cool stuff</p>
      </RevealTextAnimation>
    </div>
  );
}
