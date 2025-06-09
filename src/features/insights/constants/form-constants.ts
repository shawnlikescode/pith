import { Platform } from "react-native";

export const FORM_LABELS = {
	TYPE_OF_INSIGHT: "Type of Insight",
	QUOTE: "Quote",
	YOUR_INSIGHT: "Your Insight",
	SOURCE: "Source",
	PAGE_NUMBER: "Page #",
	AUTHOR: "Author",
	TAGS: "Tags",
	SAVE: "Save",
} as const;

export const FORM_PLACEHOLDERS = {
	QUOTE: "What excerpt from the source do you want to capture?",
	INSIGHT: "What insight or thought do you want to capture?",
	SOURCE: "Book title, article, etc.",
	PAGE_NUMBER: "123",
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
