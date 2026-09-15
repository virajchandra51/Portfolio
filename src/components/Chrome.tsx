import SceneSwitcher from "@/components/SceneSwitcher";
import SoundControl from "@/components/SoundControl";
import ThemeToggle from "@/components/ThemeToggle";

// The controls that live on the scene rather than on the paper. The scene
// switcher belongs here too, once there is more than one scene.
export default function Chrome() {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-30 flex items-start justify-between gap-3 p-3 md:p-4">
      <div className="pointer-events-auto">
        <SceneSwitcher />
      </div>
      <div className="pointer-events-auto flex items-start gap-2">
        <SoundControl />
        <ThemeToggle />
      </div>
    </div>
  );
}
