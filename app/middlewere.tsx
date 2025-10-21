import { NextResponse } from "next/server";

const BLOCKED = [
  /^\/\.env$/, /^\/\.git/, /^\/server-status$/, /^\/login\.action$/,
  /^\/swagger(\/|\.|$)/, /^\/api-docs(\/|\.|$)/, /^\/v[23]\/api-docs/,
  /^\/webjars\/swagger-ui/, /^\/v2\/_catalog$/, /^\/_all_dbs$/,
  /^\/@vite\/env$/, /^\/debug\/default\/view/, /^\/telescope\/requests/,
  /^\/info\.php$/, /^\/config\.json$/, /^\/actuator\/env$/,
  /^\/ecp\/Current\/exporttool/,
];

export function middleware(req: Request) {
  const { pathname } = new URL(req.url);
  if (BLOCKED.some((re) => re.test(pathname))) {
    return new NextResponse("Not found", { status: 404 });
  }
  return NextResponse.next();
}

export const config = { matcher: ["/:path*"] };