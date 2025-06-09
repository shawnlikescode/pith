// Text truncation limits
export const TEXT_LIMITS = {
	PASSAGE_MAX_LENGTH: 120,
	NOTE_MAX_LENGTH: 150,
} as const;

// Performance optimization settings
export const PERFORMANCE = {
	MAX_RENDER_PER_BATCH: 10,
	WINDOW_SIZE: 10,
} as const;

// Icon sizes
export const ICON_SIZES = {
	SMALL: 10,
	MEDIUM: 16,
	MEDIUM_LARGE: 18,
	LARGE: 24,
} as const;
