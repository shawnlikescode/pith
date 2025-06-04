import React, { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	useEffect(() => {
		SplashScreen.hideAsync();
	}, []);

	return (
		<>
			<StatusBar style="auto" />
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						title: "Pith",
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="add-insight"
					options={{
						title: "Add Insight",
						headerBackTitle: "Back",
						presentation: "modal",
					}}
				/>
				<Stack.Screen
					name="view-insights"
					options={{
						title: "All Insights",
						headerBackTitle: "Back",
					}}
				/>
				<Stack.Screen
					name="debug"
					options={{
						title: "Debug",
						headerBackTitle: "Back",
					}}
				/>
			</Stack>
		</>
	);
}
