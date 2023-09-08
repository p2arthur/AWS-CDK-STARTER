import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";

class L3Bucket extends Construct {
  constructor(scope: Construct, id: string, expiration: number) {
    super(scope, id);

    new Bucket(this, "L3Bucket", {
      lifecycleRules: [{ expiration: cdk.Duration.days(expiration) }],
    });
  }
}

export class CdkStarterStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //Create an S3 Bucket - L1
    new CfnBucket(this, "MyL1Bucket", {
      lifecycleConfiguration: {
        rules: [{ expirationInDays: 2, status: "Enabled" }],
      },
    });

    //Define CloudFormation parameters - this will contrain the parameters on our deployment
    const duration: cdk.CfnParameter = new cdk.CfnParameter(this, "duration", {
      default: 6,
      minValue: 1,
      maxValue: 10,
      type: "Number",
    });

    //Create an S3 Bucket - L2
    const myL2Bucket: cdk.aws_s3.Bucket = new Bucket(this, "MyL2Bucket", {
      lifecycleRules: [
        { expiration: cdk.Duration.days(duration.valueAsNumber) },
      ],
    });

    //Create an S3 Bucket - L3
    new L3Bucket(this, "MyL3Bucket", 1);

    //Log a resource name when deploying our CloudFormation stack
    new cdk.CfnOutput(this, "MyL2BucketName", { value: myL2Bucket.bucketName });
  }
}
