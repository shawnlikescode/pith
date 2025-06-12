import React from "react";
import { View } from "react-native";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Home, Plus, Book } from "~/lib/icons/icons";
import { AppHeader } from "~/components/app-header";

export default function TabsLayout() {
	return (
		<SafeAreaView className="flex-1 bg-white" edges={["top", "bottom"]}>
			<View className="p-4">
				<AppHeader />
			</View>
			<Tabs
				screenOptions={{
					headerShown: false,
					tabBarStyle: {
						backgroundColor: "#ffffff",
						borderTopWidth: 1,
						borderTopColor: "#e5e7eb",
						paddingBottom: 8,
						paddingTop: 8,
						height: 60,
					},
					tabBarActiveTintColor: "#000000",
					tabBarInactiveTintColor: "#9ca3af",
					tabBarLabelStyle: {
						fontSize: 12,
						fontWeight: "500",
						marginTop: 4,
					},
				}}
			>
				<Tabs.Screen
					name="index"
					options={{
						title: "Home",
						tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
					}}
				/>

				<Tabs.Screen
					name="add-insight"
					options={{
						title: "Add",
						tabBarIcon: ({ color, size }) => <Plus size={size} color={color} />,
					}}
				/>

				<Tabs.Screen
					name="books"
					options={{
						title: "Books",
						tabBarIcon: ({ color, size }) => <Book size={size} color={color} />,
					}}
				/>
			</Tabs>
		</SafeAreaView>
	);
}
