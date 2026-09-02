// CSS-only intro. It is rendered in the static HTML and removes itself with a
// keyframe, so it never depends on JS to get out of the way, never blocks
// clicks, and disappears instantly for prefers-reduced-motion.
const words = ["hello", "namaste", "bonjour", "ciao", "hola", "hallo"];

export default function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader-words">
        {words.map((w) => (
          <span key={w} className="preloader-word">
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}
