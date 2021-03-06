import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export type TPortalProps = {
  isOpen?: boolean;
  backDrop?: boolean;
  onClose?: () => void;
  closeOnClick?: boolean;
};

export const Portal: React.FunctionComponent<TPortalProps> = (props) => {
  const [element, setElement] = useState<HTMLDivElement | undefined>();

  useEffect(() => {
    const removePortal = () => {
      if (element) {
        document.body.removeChild(element);
      }
    };

    if (props.isOpen === true && !element) {
      const el = document.createElement("div");

      el.classList.add(`portal${props.backDrop ? "backdrop" : ""}`);
      el.addEventListener("click", () => {
        if (props.closeOnClick && typeof props.onClose === "function") {
          props.onClose();
        }
      });
      setElement(el);
    }

    return () => {
      removePortal();
    };
  }, [props, element, setElement]);

  if (!element || !props.isOpen) {
    if (element) {
      setElement(undefined);
    }

    return null;
  }

  document.body.appendChild(element);
  return ReactDOM.createPortal(props.children, element);
};
