import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AddEntryForm from "~/features/insights/components/add-entry-form";
import "~/global.css";

export default function AddEntryScreen() {
	return (
		<SafeAreaView className="flex-1 bg-white">
			<AddEntryForm />
		</SafeAreaView>
	);
}
