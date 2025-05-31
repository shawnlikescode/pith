import React from "react";
import { View, Pressable } from "react-native";
import { Link } from "expo-router";
import { Text } from "~/components/ui/text";
import { EntriesList } from "./entries-list";
import { ChevronRight } from "~/lib/icons/icons";

export const RecentEntries = () => {
	return (
		<View>
			<View className="mb-4 pl-4 pr-4">
				<View className="flex flex-row items-center justify-between">
					<Text className="text-2xl font-bold text-gray-800 mb-1">
						Recent Entries
					</Text>

					<Link href="/view-entries" asChild>
						<Pressable className="flex-row items-center p-2">
							<Text className="text-sm text-blue-600 mr-1">View All</Text>
							<ChevronRight size={16} color="#2563eb" />
						</Pressable>
					</Link>
				</View>
			</View>

			<EntriesList limit={3} showHeader={false} />
		</View>
	);
};
