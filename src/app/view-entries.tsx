import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { EntriesList } from "~/features/entries/components/entries-list";
import "~/global.css";
import useDebounce from "~/features/entries/hooks/use-debounce";

export default function ViewEntriesScreen() {
	const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
	const debouncedSearchQuery = useDebounce(searchQuery, 300);

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="pl-4 pr-4 pt-2 pb-6">
				<View className="mb-6">
					<Link href="/add-entry" asChild>
						<Button className="bg-primary">
							<Text className="text-primary-foreground">Add New Entry</Text>
						</Button>
					</Link>
				</View>

				<View className="mb-4">
					<Input
						placeholder="Search your entries..."
						value={searchQuery}
						onChangeText={setSearchQuery}
						className="w-full"
					/>
				</View>
			</View>

			<EntriesList showHeader={true} searchQuery={debouncedSearchQuery} />
		</SafeAreaView>
	);
}
