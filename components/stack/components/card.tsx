import "./card.css";

type CardProps = {
  TitleStack: string;
  StackOverview: string;
  Stack: string[];
  className?: string;
};

export default function Card({
  Stack,
  StackOverview,
  TitleStack,
  className,
}: CardProps) {
  return (
    <div className={` card_container ${className}`}>
      <div className="card_stack_container">
        <h2 className="card_title">{TitleStack}</h2>
        <p className="card_overview">{StackOverview}</p>

        <div className="card_stack">
          {Stack.map((s, i) => (
            <span
              key={i}
              className="stack"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
