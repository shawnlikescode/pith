import React from "react";
import { Pressable, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Input } from "~/components/ui/input";
import { Search, X, Filter } from "~/lib/icons/icons";
import { cn } from "~/lib/utils";

interface SearchBarProps {
	readonly placeholder?: string;
	readonly className?: string;
}

export function SearchBar({
	placeholder = "Search insights, books, or authors...",
	className,
}: SearchBarProps) {
	const params = useLocalSearchParams();

	const searchQuery = React.useMemo(() => {
		const q = params.q;
		// Handle array case
		if (Array.isArray(q)) {
			return typeof q[0] === "string" ? q[0] : "";
		}
		return typeof q === "string" ? q : "";
	}, [params.q]);

	// Local state for immediate UI updates before URL update
	const [localQuery, setLocalQuery] = React.useState(searchQuery);

	// Sync local state when URL changes (back button, etc.)
	React.useEffect(() => {
		setLocalQuery(searchQuery);
	}, [searchQuery]);

	// Debounced URL update
	React.useEffect(() => {
		const timer = setTimeout(() => {
			if (localQuery !== searchQuery) {
				router.setParams({ q: localQuery || undefined });
			}
		}, 300);

		return () => clearTimeout(timer);
	}, [localQuery, searchQuery]);

	function handleFilterPress(): void {
		// Pass current URL parameters to the filter modal
		const currentParams = {
			...(params.categories && { categories: params.categories }),
			...(params.tags && { tags: params.tags }),
		};

		router.push({
			pathname: "/filter-modal",
			params: currentParams,
		});
	}

	// Check if there are any active filters (categories or tags)
	const hasActiveFilters = React.useMemo(() => {
		const categories = params.categories;
		const tags = params.tags;

		const result =
			(typeof categories === "string" && categories.trim().length > 0) ||
			(typeof tags === "string" && tags.trim().length > 0);
		return result;
	}, [params.categories, params.tags]);

	return (
		<View className={cn("flex-row items-center gap-3", className)}>
			<View className="flex-1">
				<Input
					value={localQuery}
					onChangeText={(text) => {
						setLocalQuery(text);
					}}
					placeholder={placeholder}
					className="pl-10 pr-10"
				/>

				{/* Search Icon */}
				<View className="absolute left-3 top-3">
					<Search className="w-4 h-4 text-muted-foreground" />
				</View>

				{/* Clear Button */}
				{localQuery.length > 0 && (
					<Pressable
						onPress={() => {
							setLocalQuery("");
						}}
						className="absolute right-3 top-3 p-0.5"
					>
						<X className="w-4 h-4 text-muted-foreground" />
					</Pressable>
				)}
			</View>

			<Pressable
				onPress={handleFilterPress}
				className={cn("p-3 rounded-lg", hasActiveFilters && "bg-primary/10")}
			>
				<Filter
					className={cn(
						"w-5 h-5",
						hasActiveFilters ? "text-primary" : "text-muted-foreground"
					)}
				/>
			</Pressable>
		</View>
	);
}
