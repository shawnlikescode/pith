import React from "react";
import { View } from "react-native";
import DebugDataViewer from "~/features/debug/debug-data-viewer";

export default function DebugScreen() {
	return (
		<View className="flex-1 bg-white">
			<DebugDataViewer />
		</View>
	);
}
