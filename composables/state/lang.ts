import { useState } from "#imports";

export const useLang = () => useState<string>("lang", () => "");
