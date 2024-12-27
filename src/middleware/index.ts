import { sequence } from "astro/middleware";

import { auth } from "./auth";
import { checkUser } from "./checkUser";
import { validateEndpoints } from "./validateEndpoints";

export const onRequest = sequence(auth, validateEndpoints, checkUser); 