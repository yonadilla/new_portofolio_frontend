import Link from "next/link";
import "./logo.css";
  
export default function Logo() {
  return (
    <div className="logo_container">
      <p
        className={`logo transition-colors duration-100`}
      >
        <Link href="/">MD3</Link>
      </p>
    </div>
  );
}
