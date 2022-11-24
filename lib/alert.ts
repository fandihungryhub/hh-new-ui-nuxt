import { isClient } from "~/helpers/env";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

type NotyfInstance = Notyf | undefined;
interface ToastInstance {
  // eslint-disable-next-line no-unused-vars
  success: (text: string) => void;
  // eslint-disable-next-line no-unused-vars
  info: (text: string) => void;
  // eslint-disable-next-line no-unused-vars
  warning: (text: string) => void;
  // eslint-disable-next-line no-unused-vars
  error: (text: string) => void;
}

let notyf = undefined as NotyfInstance;
const toast: ToastInstance = {
  success: function (): void {
    throw new Error("Function not implemented.");
  },
  info: function (): void {
    throw new Error("Function not implemented.");
  },
  warning: function (): void {
    throw new Error("Function not implemented.");
  },
  error: function (): void {
    throw new Error("Function not implemented.");
  },
};
if (isClient) {
  // Create an instance of Notyf
  notyf = new Notyf({
    position: { x: "right", y: "top" },
    types: [
      {
        type: "info",
        background: "#22d3ee",
        icon: false,
      },
      {
        type: "warning",
        background: "#eab308",
        icon: false,
      },
    ],
  });

  toast.success = function (text: string) {
    notyf?.dismissAll();
    const parsedText = typeof text === "string" ? text : "";
    if (parsedText.length) {
      notyf?.success(text);
    }
  };
  toast.error = (text: string) => {
    notyf?.dismissAll();
    const parsedText = typeof text === "string" ? text : "";
    if (parsedText.length) {
      notyf?.error(text);
    }
  };
  toast.info = (text: string) => {
    notyf?.dismissAll();
    const parsedText = typeof text === "string" ? text : "";
    if (parsedText.length) {
      notyf?.open({
        type: "info",
        message: text,
      });
    }
  };
  toast.warning = (text: string) => {
    notyf?.dismissAll();
    const parsedText = typeof text === "string" ? text : "";
    if (parsedText.length) {
      notyf?.open({
        type: "warning",
        message: text,
      });
    }
  };
}

export default toast;
