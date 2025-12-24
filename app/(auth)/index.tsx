import ScreenWrapper from "@/components/ui/layout/screen-wrapper";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
} from "@gluestack-ui/themed";

import { Divider } from "@/components/ui/divider";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const validateForm = () => {
    let isValid = true;

    // Email validation
    if (!email.trim()) {
      setEmailError("Email is required");
      setEmailInvalid(true);
      isValid = false;
    } else if (email.length < 6) {
      setEmailError("Must be at least 6 characters");
      setEmailInvalid(true);
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      setEmailInvalid(true);
      isValid = false;
    } else {
      setEmailError("");
      setEmailInvalid(false);
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError("Password is required");
      setPasswordInvalid(true);
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      setPasswordInvalid(true);
      isValid = false;
    } else {
      setPasswordError("");
      setPasswordInvalid(false);
    }

    return isValid;
  };

  const handleSignIn = () => {
    if (validateForm()) {
      console.log("Login Success:", email, password);
      // Add your login logic here
    }
  };

  return (
    <ScreenWrapper isScrollable={true} headerShown={false} isSafeArea={false}>
      <SafeAreaView className="flex-1 bg-white">
        <VStack className="mt-4 px-4 mx-4 flex-1">
          <HStack className="items-center justify-end">
            <Image
              style={{ width: 65, height: 65 }}
              source={require("@/assets/images/klogo.png")}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
            />
            <Heading className="text-black" bold>
              𝖦𝖺𝗆𝖾 𝖲𝗁𝗈𝗉
            </Heading>
          </HStack>
          <VStack className="mt-5">
            <Heading className="text-black leading-snug" size="3xl">
              Sign In {"\n"}to your Account
            </Heading>
            <Text className="mt-4 text-gray-400" bold size="lg">
              Enter your emaill & password to sign in
            </Text>
          </VStack>
          <VStack className="space-y-4 mt-9 gap-5">
            <FormControl isInvalid={emailInvalid}>
              <FormControlLabel className="mb-4">
                <FormControlLabelText className="text-gray-500 font-bold">
                  Email
                </FormControlLabelText>
              </FormControlLabel>

              <Input className="bg-gray-100 border-0 rounded-xl h-16">
                <InputField
                  type="text"
                  placeholder="Please enter your emaill..."
                  placeholderTextColor="#6b7280"
                  value={email}
                  onChangeText={(text: string) => {
                    setEmail(text);
                    if (text.trim() && emailInvalid) {
                      setEmailInvalid(false);
                      setEmailError("");
                    }
                  }}
                  className="flex-1 text-black justify-center p-4"
                />
              </Input>

              {emailInvalid && (
                <FormControlError>
                  <FormControlErrorText className="text-red-500 text-xs mt-1">
                    {emailError}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
            <FormControl isInvalid={passwordInvalid} className="mt-4">
              <FormControlLabel className="mb-4">
                <FormControlLabelText className="text-gray-500 font-bold">
                  Password
                </FormControlLabelText>
              </FormControlLabel>

              <Input className="bg-gray-100 border-0 rounded-xl h-16">
                <InputField
                  type="password"
                  placeholder="*********"
                  placeholderTextColor="#6b7280"
                  value={password}
                  onChangeText={(text: string) => {
                    setPassword(text);
                    if (text.trim() && passwordInvalid) {
                      setPasswordInvalid(false);
                      setPasswordError("");
                    }
                  }}
                  secureTextEntry={true}
                  className="flex-1 text-black justify-center p-4"
                />
              </Input>

              {!passwordInvalid && (
                <FormControlHelper>
                  <FormControlHelperText className="text-gray-400 text-xs mt-1">
                    Must be 8 digits
                  </FormControlHelperText>
                </FormControlHelper>
              )}

              {passwordInvalid && (
                <FormControlError>
                  <FormControlErrorText className="text-red-500 text-xs mt-1">
                    {passwordError}
                  </FormControlErrorText>
                </FormControlError>
              )}
            </FormControl>
            <VStack className="">
              <Text
                className="self-end text-blue-700 underline mt-[-10px] mr-3"
                bold
              >
                Forget Password
              </Text>
            </VStack>
            <VStack>
              {/* Sign In Button */}
              <Button
                size="xl"
                className="bg-brand-color"
                onPress={handleSignIn}
              >
                <ButtonText className="text-white">Sign in</ButtonText>
              </Button>
              <Text className="mt-2 text-gray-500 text-center" size="sm">
                Create is new account?
              </Text>
              <Divider className="my-0.5 mt-4 bg-gray-400" />
              <Button
                size="xl"
                className="bg-brand-color mt-5"
                onPress={() => router.navigate("/sign-up")}
              >
                <ButtonText className="text-white">Register</ButtonText>
              </Button>
              <VStack className="w-full mt-6">
                <Divider className="mb-4 bg-gray-400" />

                <HStack space="md" className="w-full">
                  {/* Google Button */}
                  <Button
                    variant="outline"
                    className="flex-1 h-12 bg-white border border-gray-200 rounded-lg flex-row items-center justify-center gap-2"
                    onPress={() => console.log("Google Login")}
                  >
                    <AntDesign name="google" size={20} color="black" />
                    <ButtonText className="text-gray-700 font-bold ml-2">
                      Google
                    </ButtonText>
                  </Button>

                  <Button
                    variant="outline"
                    className="flex-1 h-12 bg-white border border-gray-200 rounded-lg flex-row items-center justify-center gap-2"
                    onPress={() => console.log("Facebook Login")}
                  >
                    {/* Facebook Logo (AntDesign Icon) */}
                    <AntDesign
                      name="facebook-square"
                      size={20}
                      color="#1877F2"
                    />
                    <ButtonText className="text-gray-700 font-bold ml-2">
                      Facebook
                    </ButtonText>
                  </Button>
                </HStack>
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

export default LoginScreen;
