import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Image } from "expo-image";
import React, { useState } from "react";
import { Text } from "react-native";

import { Button, ButtonText } from "@/components/ui/button";
import ScreenWrapper from "@/components/ui/layout/screen-wrapper";
import { AntDesign } from "@expo/vector-icons";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Input,
  InputField,
} from "@gluestack-ui/themed";
import { router } from "expo-router";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordsMatch = password.length > 0 && password === confirmPassword;

  return (
    <ScreenWrapper isScrollable={true} headerShown={false} isSafeArea={false}>
      <VStack className="flex-1 mt-4 px-6">
        <HStack className="justify-end items-center gap-2 mt-4">
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

        <HStack className="mt-7">
          <Heading className="text-black leading-[40px]" size="3xl">
            Sign Up {"\n"}to create an Account
          </Heading>
        </HStack>
        <HStack className="items-center mt-5 gap-3">
          <Text allowFontScaling={false} className=" text-gray-500">
            Already have an account?
          </Text>
          <Text
            allowFontScaling={false}
            className="text-sky-400 underline font-medium"
          >
            Sign in
          </Text>
        </HStack>
        <VStack className="mb-5">
          <FormControl className="mb-7">
            <FormControlLabel className="mb-3">
              <FormControlLabelText className="text-gray-600 font-medium mt-3 ">
                Email
              </FormControlLabelText>
            </FormControlLabel>
            <Input className="bg-gray-100 border-0 rounded-lg h-16">
              <InputField
                placeholder="Please enter your email..."
                placeholderTextColor="gray"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                className="text-black mt-3"
              />
            </Input>
          </FormControl>

          <FormControl className="mb-4">
            <FormControlLabel className="mb-4">
              <FormControlLabelText className="text-gray-600 font-medium">
                Password
              </FormControlLabelText>
            </FormControlLabel>
            <Input className="bg-gray-100 border-0 rounded-lg h-16">
              <InputField
                placeholder="***********"
                type="password"
                placeholderTextColor="gray"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
                className="mt-3 text-black"
              />
            </Input>
          </FormControl>

          <FormControl
            isInvalid={!passwordsMatch && confirmPassword.length > 0}
            className="mb-8"
          >
            <FormControlLabel className="mb-4 mt-3">
              <FormControlLabelText className="text-gray-600 font-medium">
                Confirm Password
              </FormControlLabelText>
            </FormControlLabel>
            <Input className="bg-gray-100 border-0 rounded-lg h-16">
              <InputField
                placeholder="Re-enter password"
                placeholderTextColor="gray"
                type="password"
                secureTextEntry={true}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                className="text-black mt-3"
              />
            </Input>
          </FormControl>
          <Button size="xl" className="bg-brand-color mt-4 rounded-lg" onPress={() => router.navigate("/(app)/(bottom-tab)/home")}>
            <ButtonText className="text-white">Sign up</ButtonText>
          </Button>
        </VStack>
        <VStack className="w-full mt-6">
          <Text className="text-center text-gray-500 mb-4 font-medium">
            Or sign up with
          </Text>

          <HStack space="md" className="w-full">
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
              <AntDesign name="facebook-square" size={20} color="#1877F2" />
              <ButtonText className="text-gray-700 font-bold ml-2">
                Facebook
              </ButtonText>
            </Button>
          </HStack>
        </VStack>
      </VStack>
    </ScreenWrapper>
  );
};

export default SignUpScreen;
