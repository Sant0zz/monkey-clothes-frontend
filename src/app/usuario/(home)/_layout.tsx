import { Stack } from "expo-router";

export default function layout() {
    return (
        <Stack screenOptions={{headerShown:false}}>
            <Stack.Screen name="index" options={{title:"HOME"}}/>
            <Stack.Screen name="produtos"/>
        </Stack>
    )
}