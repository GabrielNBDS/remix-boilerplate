import type { ColorScheme } from "@mantine/core";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import type { ActionFunction, LoaderFunction, MetaFunction} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Form,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import { useRef, useState } from "react";
import { commitThemeSession, getThemeSession } from "./cookies/theme.cookie";
import useMatchesData from "./utils/hooks/useMatchesData";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const { theme } = useLoaderData();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <MantineTheme defaultTheme={theme}>
          <Outlet />
        </MantineTheme>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(
    request.headers.get("Cookie")
  );
  const theme = themeSession.get("theme") || 'light'

  return json({ theme });
}

export const action: ActionFunction = async ({ request }) => {
  const themeSession = await getThemeSession(
    request.headers.get("Cookie")
  );

  const theme = themeSession.get("theme") || 'light'

  themeSession.set("theme", theme === 'light' ? 'dark' : 'light');
  
  const formData = await request.formData()
  const pathname = formData.get('path') as string

  return redirect(pathname || '/', {
    headers: {
      "Set-Cookie": await commitThemeSession(themeSession),
    },
  });
}

function MantineTheme({ children }: { children: React.ReactNode, defaultTheme: 'light' | 'dark' }) {
  const { theme } = useMatchesData<{ theme: 'light' | 'dark'}>('root')
  
  const changeCookieThemeButtonRef = useRef<null | HTMLButtonElement>(null)
  
  const [colorScheme, setColorScheme] = useState<ColorScheme>(theme);
  const toggleColorScheme = (value?: ColorScheme) => {
    changeCookieThemeButtonRef.current?.click()
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"))
  }

  const location = useLocation();

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withNormalizeCSS
        withGlobalStyles
      >
        <Form method="post">
          <button name="path" value={location.pathname} ref={changeCookieThemeButtonRef} style={{ display: "none" }} type="submit">change theme</button>
        </Form>
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}