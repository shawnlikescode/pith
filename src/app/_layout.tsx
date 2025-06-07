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
					name="(tabs)"
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="filter-modal"
					options={{
						presentation: "modal",
						headerShown: false,
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
