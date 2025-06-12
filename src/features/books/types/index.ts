import type { BookWithInsights } from "~/lib/types/insight";

export interface BookWithStats extends BookWithInsights {
	lastUpdated: string;
}
