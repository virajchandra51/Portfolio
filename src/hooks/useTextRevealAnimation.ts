import { useEffect } from "react";
import SplitType from "split-type";
import { useAnimate, stagger } from "motion/react";

const useTextRevealAnimation = (props: {
  duration?: number;
  delay?: number;
}) => {
  const [scope, animate] = useAnimate();
  useEffect(() => {
    new SplitType(scope.current, {
      types: "lines,words",
      tagName: "span",
    });
  }, [scope, animate]);
  const entraceAnimation = () => {
    return animate(
      scope.current.querySelectorAll(".word"),
      {
        transform: "translateY(0)",
      },
      {
        duration: props.duration || 0.5,
        delay: stagger(props.delay || 0.2),
      }
    );
  };
  const exitAnimation = () => {
    return animate(
      scope.current.querySelectorAll(".word"),
      {
        transform: "translateY(100%)",
      },
      {
        duration: 0.3,
        delay: stagger(-0.025, {
          startDelay: scope.current.querySelectorAll(".word").length * 0.025,
        }),
      }
    );
  };
  return { scope, entraceAnimation, exitAnimation };
};

export default useTextRevealAnimation;
