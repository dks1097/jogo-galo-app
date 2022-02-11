import React from "react";
import { View, StyleSheet } from "react-native";

const Cruz = () => {
	return (
		<View style={{ flex: 1 }}>
			<View
				style={{
					position: "absolute",
					left: "48%",
					width: 10,
					height: "100%",
					backgroundColor: "#dac1a8",
					borderRadius: 5,
					transform: [
						{
							rotate: "45deg",
						},
					],
				}}
			/>
			<View style={[styles.crossLine, styles.crossLineReversed]} />
		</View>
	);
};

const styles = StyleSheet.create({
	crossLine: {
		position: "absolute",
		left: "48%",
		width: 10,
		height: "100%",
		backgroundColor: "#dac1a8",
		borderRadius: 5,
		transform: [
			{
				rotate: "45deg",
			},
		],
	},
	crossLineReversed: {
		transform: [
			{
				rotate: "-45deg",
			},
		],
	},
});

export default Cruz;
