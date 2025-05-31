import React from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	useEffect(() => {
		SplashScreen.hideAsync();
	}, []);

	return (
		<React.Fragment>
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
					name="add-entry"
					options={{
						title: "Add Entry",
						headerBackTitle: "Back",
						presentation: "modal",
					}}
				/>
				<Stack.Screen
					name="view-entries"
					options={{
						title: "All Entries",
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
		</React.Fragment>
	);
}
