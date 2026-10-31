import { lazy } from "react"
import { Navigate, type RouteObject } from "react-router-dom"
import RootLayout from "@/components/layout/RootLayout"

// Lazy per route so each page ships its own chunk (CLAUDE.md code standards).
const Home = lazy(() => import("@/pages/Home"))
const Privacy = lazy(() => import("@/pages/Privacy"))

/**
 * Route objects, deliberately in plain data form so prerendering can consume
 * the same list without restructuring (docs/PLAN.md, Phase 1).
 *
 * Single landing page: the site is one page at "/" plus the privacy policy.
 * Everything that used to be its own route is a section of Home, reached
 * through an in-page anchor (see src/data/navigation.ts).
 *
 * There is no 404 page by decision, so unknown URLs redirect to the landing
 * page rather than rendering nothing.
 */
export const routes: RouteObject[] = [
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: "privacy", element: <Privacy /> },
			{ path: "*", element: <Navigate to="/" replace /> },
		],
	},
]
