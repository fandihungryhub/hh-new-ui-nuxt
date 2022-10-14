import ky, { HTTPError } from "ky-universal";
import type { Options, SearchParamsOption } from "ky";
import humps from "humps";
import qs from "qs";

type paramConfig = {
  url: string;
  method?: "POST" | "GET" | "PUT" | "PATCH" | "DELETE";
  headers?: SearchParamsOption;
  data?: Record<string, unknown>;
  params?: Record<string, unknown>;
  canRetry?: boolean;
  canCancel?: boolean;
  withCredentials?: boolean;
  lang?: string;
};

type State = {
  data: unknown | null;
  httpStatus: number;
  error: {
    message: string;
    detail: unknown;
  };
};

async function useHttp(paramConfig: paramConfig): Promise<State> {
  const state: State = {
    data: null,
    httpStatus: 0,
    error: {
      message: "",
      detail: undefined as unknown,
    },
  };

  try {
    const DEFAULT_HEADERS = {
      "Content-Type": "application/json",
      "X-HH-Language": paramConfig.lang || "th",
    };
    const REQUIRED_PARAMS = {
      client_type: "web",
    };

    const options: Options = {
      method: paramConfig.method || "GET",
      headers: DEFAULT_HEADERS,
    };

    if (paramConfig.data) {
      options.json = humps.decamelizeKeys(paramConfig.data);
    }

    const isURLContainQueryString = paramConfig.url.includes("?")
      ? true
      : false;

    if (isURLContainQueryString) {
      let parsedParamsStringify = qs.stringify(REQUIRED_PARAMS);
      if (paramConfig.params) {
        parsedParamsStringify = qs.stringify(
          humps.decamelizeKeys({
            ...REQUIRED_PARAMS,
            ...paramConfig.params,
          })
        );
      }
      paramConfig.url = `${paramConfig.url}&${parsedParamsStringify}`;
    } else {
      let parsedParams = REQUIRED_PARAMS as Record<string, any>;
      if (paramConfig.params) {
        parsedParams = humps.decamelizeKeys({
          ...REQUIRED_PARAMS,
          ...paramConfig.params,
        });
      }
      options.searchParams = new URLSearchParams(parsedParams);
    }

    const response = await ky(paramConfig.url, options);
    const responseJson = await response.json();
    state.data = humps.camelizeKeys(responseJson);
    state.httpStatus = response.status;
  } catch (err) {
    if (err instanceof HTTPError) {
      const { status } = err.response;
      const jsonVal = await err.response.json();
      state.httpStatus = status;
      state.error.message = jsonVal.message;
      state.error.detail = err;
    } else {
      state.error.detail = err;
      state.error.message = "Something went wrong when setup http call";
    }
  }
  return state;
}

export default useHttp;
