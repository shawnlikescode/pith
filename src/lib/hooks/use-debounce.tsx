import { useEffect, useState } from "react";

/**
 * Debounces a value with a specified delay
 */
export function useDebounce<TValue>(value: TValue, delay: number): TValue {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}
