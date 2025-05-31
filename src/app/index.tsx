import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Button } from "~/components/ui/button";
import "~/global.css";

export default function IndexScreen() {
	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="flex-1 px-4 py-6">
				<View className="mb-8">
					<Text className="text-3xl font-bold text-gray-800 mb-2">Pith</Text>
					<Text className="text-gray-600">
						Save and organize your book insights
					</Text>
				</View>

				<View className="mb-4">
					<Link href="/add-entry" asChild>
						<Button className="bg-primary">
							<Text className="text-primary-foreground">Add New Entry</Text>
						</Button>
					</Link>
				</View>

				<View className="mb-4">
					<Link href="/debug" asChild>
						<Button className="bg-primary">
							<Text className="text-primary-foreground">Debug</Text>
						</Button>
					</Link>
				</View>
			</View>
		</SafeAreaView>
	);
}
