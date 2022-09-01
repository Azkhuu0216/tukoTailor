import React from "react";
import Routes from "../screens/Routes";
import { AuthProvider } from "./AuthProvider.ios";
import PushController from "./PushController";
export const Providers = () => {
  return (
    <AuthProvider>
      <Routes />
      <PushController />
    </AuthProvider>
  );
};
