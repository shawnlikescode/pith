import React from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { EntriesList } from "~/features/entries/components/entries-list";
import "~/global.css";

export default function ViewEntriesScreen() {
	return (
		<SafeAreaView className="flex-1 bg-white">
			<ScrollView className="flex-1">
				<View className="pl-4 pr-4 pt-4 pb-6">
					<View className="mb-6">
						<Link href="/add-entry" asChild>
							<Button className="bg-primary">
								<Text className="text-primary-foreground">Add New Entry</Text>
							</Button>
						</Link>
					</View>
				</View>

				<EntriesList showHeader={true} />
			</ScrollView>
		</SafeAreaView>
	);
}
