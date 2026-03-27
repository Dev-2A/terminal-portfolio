import { useState, useEffect, useRef } from "react";

export default function useTypingEffect(lines, speed = 20, onComplete) {
  const [displayLines, setDisplayLines] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const cancelRef = useRef(false);

  useEffect(() => {
    if (!lines || lines.length === 0) return;

    cancelRef.current = false;
    setIsTyping(true);

    let lineIndex = 0;
    let charIndex = 0;
    const result = [];

    function tick() {
      if (cancelRef.current) return;

      const currentLine = lines[lineIndex];

      if (!currentLine) {
        setIsTyping(false);
        onComplete?.();
        return;
      }

      if (
        currentLine.type === "ascii" ||
        currentLine.content === "" ||
        currentLine.type === "comment"
      ) {
        result.push(currentLine);
        setDisplayLines([...result]);
        lineIndex++;
        charIndex = 0;
        setTimeout(tick, 30);
        return;
      }

      if (charIndex <= currentLine.content.length) {
        const partial = {
          ...currentLine,
          content: currentLine.content.slice(0, charIndex),
        };

        const updated = [...result, partial];
        setDisplayLines(updated);

        charIndex++;
        setTimeout(tick, speed);
      } else {
        result.push(currentLine);
        setDisplayLines([...result]);
        lineIndex++;
        charIndex = 0;
        setTimeout(tick, 30);
      }
    }

    tick();

    return () => {
      cancelRef.current = true;
    };
  }, [lines]);

  const skipTyping = () => {
    cancelRef.current = true;
    setDisplayLines(lines);
    setIsTyping(false);
    onComplete?.();
  };

  return { displayLines, isTyping, skipTyping };
}
