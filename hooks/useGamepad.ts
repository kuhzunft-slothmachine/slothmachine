import { useEffect, useState, useRef } from "react";

const useGamepad = (callbacks: {
  onButtonPressed?: (index: number) => void;
  onAxisPressed?: (direction: "up" | "right" | "down" | "left") => void;
}) => {
  const [gamepad, setGamepad] = useState<Gamepad>();
  const buttonsPressed = useRef([]);
  const axesPressed = useRef([]);

  useEffect(() => {
    const gamepadConnected = (e: GamepadEvent) => {
      console.log(
        "Gamepad connected at index %d: %s. %d buttons, %d axes.",
        e.gamepad.index,
        e.gamepad.id,
        e.gamepad.buttons.length,
        e.gamepad.axes.length
      );
      setGamepad(e.gamepad);
    };
    const gamepadDisconnected = (e: GamepadEvent) => {
      console.log(
        "Gamepad disconnected from index %d: %s",
        e.gamepad.index,
        e.gamepad.id
      );
      setGamepad(undefined);
    };

    window.addEventListener("gamepadconnected", gamepadConnected);
    window.addEventListener("gamepaddisconnected", gamepadDisconnected);

    return () => {
      window.removeEventListener("gamepadconnected", gamepadConnected);
      window.removeEventListener("gamepaddisconnected", gamepadDisconnected);
    };
  }, []);

  useEffect(
    () => {
      if (!gamepad) {
        return;
      }

      let raf: number;
      const loop = () => {
        const currentGamepad = navigator.getGamepads()[0];
        if (currentGamepad) {
          currentGamepad.buttons.forEach((button, index) => {
            if (button.pressed && !buttonsPressed.current[index]) {
              callbacks.onButtonPressed(index);
              buttonsPressed.current[index] = true;
            }

            if (!button.pressed) {
              buttonsPressed.current[index] = false;
            }
          });
          currentGamepad.axes.forEach((axes, index) => {
            const pressed = axes === 1.0 || axes === -1.0;

            if (pressed && !axesPressed.current[index]) {
              if (index === 1 && axes === -1) {
                callbacks.onAxisPressed("up");
              }
              if (index === 1 && axes === 1) {
                callbacks.onAxisPressed("down");
              }
              if (index === 0 && axes === -1) {
                callbacks.onAxisPressed("left");
              }
              if (index === 0 && axes === 1) {
                callbacks.onAxisPressed("right");
              }

              axesPressed.current[index] = true;
            }

            if (!pressed) {
              axesPressed.current[index] = false;
            }
          });
        }

        if (gamepad) {
          raf = requestAnimationFrame(loop);
        } else {
          raf = undefined;
        }
      };

      raf = requestAnimationFrame(loop);

      return () => {
        cancelAnimationFrame(raf);
      };
    },
    [gamepad]
  );
};

export default useGamepad;
