import { Platform } from "react-native";

export const FORM_LABELS = {
	CATEGORY_OF_INSIGHT: "Category of Insight",
	QUOTE: "Quote",
	YOUR_INSIGHT: "Your Insight",
	SOURCE: "Source",
	LOCATION: "Location",
	AUTHOR: "Author",
	TAGS: "Tags",
	SAVE: "Save",
} as const;

export const FORM_PLACEHOLDERS = {
	QUOTE: "What excerpt from the source do you want to capture?",
	INSIGHT: "What insight or thought do you want to capture?",
	SOURCE: "Book title, article, etc.",
	LOCATION: "Page 12",
	AUTHOR: "Author name",
} as const;

export const FORM_CONFIG = {
	KEYBOARD_BEHAVIOR: Platform.OS === "ios" ? "padding" : "height",
	SCROLL_PROPS: {
		keyboardShouldPersistTaps: "handled" as const,
		showsVerticalScrollIndicator: false,
		contentInsetAdjustmentBehavior: "automatic" as const,
		keyboardDismissMode: "interactive" as const,
	},
} as const;
