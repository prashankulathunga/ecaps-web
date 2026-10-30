import { lazy } from "react"
import type { RouteObject } from "react-router-dom"
import RootLayout from "@/components/layout/RootLayout"

// Lazy per route so each page ships its own chunk (CLAUDE.md code standards).
const Home = lazy(() => import("@/pages/Home"))
const Services = lazy(() => import("@/pages/Services"))
const Projects = lazy(() => import("@/pages/Projects"))
const About = lazy(() => import("@/pages/About"))
const Contact = lazy(() => import("@/pages/Contact"))
const Privacy = lazy(() => import("@/pages/Privacy"))
const DesignSystem = lazy(() => import("@/pages/DesignSystem"))
const NotFound = lazy(() => import("@/pages/NotFound"))

/**
 * Route objects, deliberately in plain data form so prerendering can consume
 * the same list without restructuring (docs/PLAN.md, Phase 1).
 */
export const routes: RouteObject[] = [
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "services", element: <Services /> },
			{ path: "projects", element: <Projects /> },
			{ path: "about", element: <About /> },
			{ path: "contact", element: <Contact /> },
			{ path: "privacy", element: <Privacy /> },
			{ path: "design-system", element: <DesignSystem /> },
			{ path: "*", element: <NotFound /> },
		],
	},
]
