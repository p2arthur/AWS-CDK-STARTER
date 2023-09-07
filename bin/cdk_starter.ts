#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CdkStarterStack } from "../lib/cdk_starter-stack";

const app = new cdk.App();
new CdkStarterStack(app, "CdkStarterStack");
