import { Cookies, CookieAttributes } from "~/lib/cookies";
import isErrorWithMessage from "./isErrorWithMessage";
import { isAllowCookie, isAllowLocalStorage } from "./permissions";
import { isValidJsonString } from "./string";

type SupportedStorage = "cookie" | "localstorage";

export function saveToUserStorage({
  key,
  val,
  type,
  cookieOption,
}: {
  key: string;
  val: any;
  type: SupportedStorage;
  cookieOption?: CookieAttributes;
}): {
  success: boolean;
  message: string;
} {
  const defaultErrorMessage = "Cannot save to user storage";
  try {
    const parsedVal = JSON.stringify(val);
    if (!isAllowCookie() && !isAllowLocalStorage()) {
      return {
        success: false,
        message: "cookie and localstorage permission not granted ",
      };
    }
    if (type === "cookie") {
      if (isAllowCookie()) {
        Cookies.set(key, parsedVal, cookieOption);
        return {
          success: true,
          message: "",
        };
      }
      localStorage.setItem(key, parsedVal);
      return {
        success: true,
        message: "",
      };
    }
    if (isAllowLocalStorage()) {
      localStorage.setItem(key, parsedVal);
      return {
        success: true,
        message: "",
      };
    }
    return {
      success: false,
      message: "localstorage permission not granted",
    };
  } catch (err) {
    if (isErrorWithMessage(err)) {
      return {
        success: false,
        message: err.message,
      };
    }
    return {
      success: false,
      message: defaultErrorMessage,
    };
  }
}

export function getFromUserStorage({
  key,
  type,
}: {
  key: string;
  type?: SupportedStorage;
}): { success: boolean; message: string; data: any } {
  try {
    let val;
    if (!type) {
      if (isAllowCookie()) {
        val = Cookies.get(key) || "";
      } else if (isAllowLocalStorage()) {
        val = localStorage.getItem(key) || "";
      }
    } else if (type == "cookie") {
      val = Cookies.get(key) || "";
    } else if (type == "localstorage") {
      val = localStorage.getItem(key) || "";
    }
    if (typeof val === "string") {
      if (isValidJsonString(val)) {
        return {
          success: true,
          message: "",
          data: JSON.parse(val),
        };
      }
      return {
        success: true,
        message: "",
        data: val,
      };
    }
    return {
      success: true,
      message: "",
      data: val,
    };
  } catch (err) {
    if (isErrorWithMessage(err)) {
      return {
        success: false,
        message: err.message,
        data: null,
      };
    }
    return {
      success: false,
      message: "cannot get item from user storage",
      data: null,
    };
  }
}

export function removeFromUserStorage({
  key,
  cookieOption,
  type,
}: {
  key: string;
  type?: SupportedStorage;
  cookieOption?: CookieAttributes;
}): { message: string; success: boolean } {
  const defaultErrorMessage = "cannot remve from user storage";
  try {
    if (type === "cookie") {
      if (isAllowCookie()) {
        Cookies.remove(key, cookieOption);
        return {
          success: true,
          message: "",
        };
      }
      return {
        success: true,
        message: "",
      };
    }
    if (isAllowLocalStorage()) {
      localStorage.removeItem(key);
      return {
        success: true,
        message: "",
      };
    }
    return {
      success: true,
      message: "",
    };
  } catch (err) {
    if (isErrorWithMessage(err)) {
      return {
        success: false,
        message: err.message,
      };
    }
    return {
      success: false,
      message: defaultErrorMessage,
    };
  }
}
