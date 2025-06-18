import React, { useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { ErrorBoundary } from "~/components/error-boundary";

SplashScreen.preventAutoHideAsync();

function AppContent() {
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

export default function RootLayout() {
	return (
		<ErrorBoundary>
			<AppContent />
		</ErrorBoundary>
	);
}
