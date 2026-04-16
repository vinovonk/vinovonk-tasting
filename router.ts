// Hash-based router voor TastingApp island
// Geen React Router nodig — flat route structuur, ~30 regels code

import { useEffect, useState } from "react";

export interface Route {
	path: string;
	params: Record<string, string>;
}

// Parst '#/sessie/abc123/fles/xyz' → { path: '/sessie/:id/fles/:flesId', params: { id: 'abc123', flesId: 'xyz' } }
const ROUTES = [
	"/sessie/:id/fles/nieuw",
	"/sessie/:id/fles/:flesId",
	"/sessie/nieuw",
	"/sessie/:id",
	"/archief",
	"/instellingen",
	"/biodynamisch",
	"/hoe-gebruik-je-dit",
	"/over",
	"/",
];

function matchRoute(hash: string): Route {
	const path = hash.replace(/^#/, "") || "/";
	const segments = path.split("/").filter(Boolean);

	for (const pattern of ROUTES) {
		const patternSegments = pattern.split("/").filter(Boolean);
		if (segments.length !== patternSegments.length) continue;

		const params: Record<string, string> = {};
		let matched = true;

		for (let i = 0; i < patternSegments.length; i++) {
			if (patternSegments[i].startsWith(":")) {
				params[patternSegments[i].slice(1)] = segments[i];
			} else if (patternSegments[i] !== segments[i]) {
				matched = false;
				break;
			}
		}

		if (matched) return { path: pattern, params };
	}

	return { path: "/", params: {} };
}

export function useHashRoute(): Route {
	const getRoute = () => matchRoute(window.location.hash);
	const [route, setRoute] = useState<Route>(() => {
		if (typeof window === "undefined") return { path: "/", params: {} };
		return getRoute();
	});

	useEffect(() => {
		const handler = () => setRoute(getRoute());
		window.addEventListener("hashchange", handler);
		// Zet ook initieel vanuit huidige hash
		setRoute(getRoute());
		return () => window.removeEventListener("hashchange", handler);
	}, []);

	return route;
}

export function navigate(path: string): void {
	window.location.hash = path;
}

export function goBack(): void {
	window.history.back();
}
