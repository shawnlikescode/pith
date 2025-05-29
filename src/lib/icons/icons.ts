import type { LucideIcon } from "lucide-react-native";
import { cssInterop } from "nativewind";
import { Sun, MoonStar } from "lucide-react-native";

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

export { Sun, MoonStar };
