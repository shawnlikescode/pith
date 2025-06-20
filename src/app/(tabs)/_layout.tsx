import React from "react";
import { View } from "react-native";
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import { SafeAreaView } from "react-native-safe-area-context";
import { Home, Plus, Book } from "~/lib/icons/icons";
import { Text } from "~/components/ui/text";

export default function TabsLayout() {
	return (
		<SafeAreaView className="flex-1 bg-background" edges={["top"]}>
			<Tabs>
				<TabSlot />
				<TabList className="bg-background border-t border-border h-24 flex flex-row justify-evenly items-center pl-8 pr-8 pb-2">
					<TabTrigger name="home" href="/">
						<View className="flex flex-col items-center justify-center px-4">
							<Home className="text-muted-foreground w-5 h-5" />
							<Text className="text-xs font-medium text-muted-foreground">
								Home
							</Text>
						</View>
					</TabTrigger>

					<TabTrigger name="add" href="/add-insight">
						<View className="flex flex-col items-center justify-center px-4">
							<Plus className="text-muted-foreground w-5 h-5" />
							<Text className="text-xs font-medium text-muted-foreground">
								Add
							</Text>
						</View>
					</TabTrigger>

					<TabTrigger name="books" href="/books">
						<View className="flex flex-col items-center justify-center px-4">
							<Book className="text-muted-foreground w-5 h-5" />
							<Text className="text-xs font-medium text-muted-foreground">
								Books
							</Text>
						</View>
					</TabTrigger>
				</TabList>
			</Tabs>
		</SafeAreaView>
	);
}
