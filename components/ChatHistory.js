import { Fragment, useState, useEffect } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function ChatHistory({ history }) {
  const [open, setOpen] = useState(0);
  const [lastAnswer, setLastAnswer] = useState("");

  useEffect(() => {
    if (history.length > 0) {
      setOpen(history.length);
      setLastAnswer(history[history.length - 1].answer);
    }
    window.scrollTo(0, window.innerHeight*100000000000)
  }, [history]);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const customAnimation = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };

  return (
    <div className="w-[95%] lg:w-[50%] border pt-4 pb-8 px-4 lg:px-6 rounded-2xl bg-white shadow-2xl mb-10">
      <Fragment>
        {history.map((item, index) => (
          <Accordion
            key={index}
            open={open === index + 1}
            animate={customAnimation}
            icon={<Icon id={index + 1} open={open} />}
          >
            <AccordionHeader
              className="overflow-hidden"
              onClick={() => handleOpen(index + 1)}
            >
              {item.question}
            </AccordionHeader>
            <AccordionBody className="text-justify">
              {index === history.length - 1 ? (
                <Typewriter text={lastAnswer} />
              ) : 
                item.answer
              }
            </AccordionBody>
          </Accordion>
        ))}
      </Fragment>
    </div>
  );
}

function Typewriter({ text }) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 10);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return <span>{displayText}</span>;
}
