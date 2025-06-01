import React from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { RecentEntries } from "~/features/entries/components/recent-entries";
import "~/global.css";

export default function IndexScreen() {
	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="flex-1 pl-4 pr-4 pt-6">
				<View className="mb-6">
					<View className="flex flex-row justify-between">
						<Text className="text-3xl font-bold text-gray-800 mb-2">Pith</Text>
						<Link href="/debug" asChild>
							<Button>
								<Text>Debug</Text>
							</Button>
						</Link>
					</View>

					<Text className="text-gray-600">
						Save and organize your book insights
					</Text>
				</View>
				<View className="flex-1">
					<RecentEntries />
				</View>
				<View className="pb-6">
					<Link href="/add-entry" asChild>
						<Button className="bg-primary">
							<Text className="text-primary-foreground">Add New Entry</Text>
						</Button>
					</Link>
				</View>
			</View>
		</SafeAreaView>
	);
}
