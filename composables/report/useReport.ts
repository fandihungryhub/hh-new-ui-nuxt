import { isEmpty } from "lodash-es";
import Rollbar, { Configuration } from "rollbar";

type ReportParameter = {
  message: string;
  level: "critical" | "error" | "warning" | "debug" | "info";
  errorException?: any;
  object?: Record<string, unknown>;
};

let rollbarInstance = {} as InstanceType<typeof Rollbar>;

function setupReport(rollbarConfig: Configuration) {
  rollbarInstance = new Rollbar(rollbarConfig);
}

const useReport = (paramater: ReportParameter) => {
  if (isEmpty(rollbarInstance)) {
    throw new Error("Rollbar instance is not configured");
  }
  const logLevel = paramater.level || "debug";
  rollbarInstance.configure({ logLevel });
  rollbarInstance.log(
    paramater.message,
    paramater.object,
    paramater.errorException
  );
  console.log(paramater);
};

export { useReport, setupReport as setupUseReport };
