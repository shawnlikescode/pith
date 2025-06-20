import React from "react";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { SearchBar } from "~/features/insights/components/search-bar";

interface AppHeaderProps {
	readonly title: string;
	readonly showSearch?: boolean;
	readonly subtitle?: string;
}

export function AppHeader({
	title,
	showSearch = false,
	subtitle,
}: AppHeaderProps) {
	return (
		<View className="bg-background px-6 py-4 border-b border-border">
			<View className="space-y-2">
				<Text className="text-4xl font-bold text-foreground">{title}</Text>
				{subtitle && (
					<Text className="text-sm text-muted-foreground">{subtitle}</Text>
				)}
			</View>

			{showSearch && (
				<View className="mt-4">
					<SearchBar />
				</View>
			)}
		</View>
	);
}
