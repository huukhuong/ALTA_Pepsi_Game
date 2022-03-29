import React from "react";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { CongratulationScreen, HomeScreen, LoginScreen, OTPScreen, PlayGameScreen, RulesScreen, SignupScreen, TutorialScreen } from "./src/screens";

const Stack = createNativeStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{ headerShown: false }}
				initialRouteName='Login'>
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Signup" component={SignupScreen} />
				<Stack.Screen name="Rules" component={RulesScreen} />
				<Stack.Screen name="OTP" component={OTPScreen} />
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Tutorial" component={TutorialScreen} />
				<Stack.Screen name="PlayGame" component={PlayGameScreen} />
				<Stack.Screen name="Congratulation" component={CongratulationScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;