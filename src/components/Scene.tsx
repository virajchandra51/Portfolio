// The fixed backdrop the postcard sits on. The art itself is a CSS gradient
// placeholder for now: point --scene-image at a real file in globals.css
// (url("/scenes/desk-night.png")) and raise --scene-blur to swap it in.
export default function Scene() {
  return (
    <div className="scene" aria-hidden="true">
      <div className="scene-art" />
      <div className="scene-veil" />
    </div>
  );
}
