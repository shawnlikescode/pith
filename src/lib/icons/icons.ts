import type { LucideIcon } from "lucide-react-native";
import { cssInterop } from "nativewind";
import { Sun, MoonStar, LoaderCircle, ChevronRight } from "lucide-react-native";

function iconWithClassName(icon: LucideIcon) {
	cssInterop(icon, {
		className: {
			target: "style",
			nativeStyleToProp: {
				color: true,
				opacity: true,
			},
		},
	});
}

iconWithClassName(Sun);
iconWithClassName(MoonStar);
iconWithClassName(LoaderCircle);
iconWithClassName(ChevronRight);

export { Sun, MoonStar, LoaderCircle, ChevronRight };
