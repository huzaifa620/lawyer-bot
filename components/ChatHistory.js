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

  useEffect(() => {
    if (history.length > 0) {
      setOpen(history.length);
    }
  }, [history]);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const customAnimation = {
    mount: { scale: 1 },
    unmount: { scale: 0.9 },
  };

  return (
    <div className="w-[40%] border pt-4 pb-8 px-4 rounded-2xl">
      <Fragment>
        {history.map((item, index) => (
          <Accordion
            key={index}
            open={open === index + 1}
            animate={customAnimation}
            icon={<Icon id={index + 1} open={open} />}
          >
            <AccordionHeader className="overflow-hidden" onClick={() => handleOpen(index + 1)}>
              {item.question}
            </AccordionHeader>
            <AccordionBody>{item.answer}</AccordionBody>
          </Accordion>
        ))}
      </Fragment>
    </div>
  );
}
