import { useColorScheme as useNativewindColorScheme } from "nativewind";

export function useColorScheme(): {
	colorScheme: "light" | "dark";
	isDarkColorScheme: boolean;
	setColorScheme: (colorScheme: "light" | "dark" | "system") => void;
	toggleColorScheme: () => void;
} {
	const { colorScheme, setColorScheme, toggleColorScheme } =
		useNativewindColorScheme();
	return {
		colorScheme: colorScheme ?? "dark",
		isDarkColorScheme: colorScheme === "dark",
		setColorScheme,
		toggleColorScheme,
	};
}
