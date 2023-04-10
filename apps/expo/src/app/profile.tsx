import { Text, TouchableOpacity, View } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { AntDesign } from "@expo/vector-icons";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";

export default function Profile() {
  const user = useUser();
  return (
    <View className="flex-1 bg-zinc-800 p-4">
      {user ? <SignedInView /> : <SignedOutView />}
    </View>
  );
}

function SignedInView() {
  const user = useUser();

  return (
    <View>
      <Text>Signed in as {user?.email}</Text>
    </View>
  );
}

function SignedOutView() {
  const supabase = useSupabaseClient();

  const signInWithGithub = () =>
    supabase.auth
      .signInWithOAuth({ provider: "github" })
      .then((res) => console.log(res));

  return (
    <View className="space-y-4">
      <Text className="text-2xl font-bold text-zinc-200">
        You&apos;re signed out.
      </Text>
      <TouchableOpacity
        onPress={signInWithGithub}
        className="h-14 flex-row items-center justify-center gap-2 rounded-lg bg-zinc-200 p-2"
      >
        <AntDesign name="github" size={18} color="black" />
        <Text className="text-xl font-medium">Sign In With Github</Text>
      </TouchableOpacity>

      {/* Sign in with Apple */}
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        className="h-14"
        cornerRadius={8}
        onPress={async () => {
          try {
            const _credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            // signed in
          } catch (e) {
            if (typeof e === "object" && !!e && "code" in e) {
              if (e.code === "ERR_REQUEST_CANCELED") {
                // handle that the user canceled the sign-in flow
              } else {
                // handle other errors
              }
            } else {
              console.error("Unexpected error from Apple SignIn: ", e);
            }
          }
        }}
      />
    </View>
  );
}