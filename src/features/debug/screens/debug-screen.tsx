import React from "react";
import { View } from "react-native";
import { DebugDataViewer } from "../components/debug-data-viewer";

export const DebugScreen = () => {
	return (
		<View className="flex-1 bg-white">
			<DebugDataViewer />
		</View>
	);
};
