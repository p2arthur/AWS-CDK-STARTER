import * as cdk from "aws-cdk-lib";
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

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

    //Create an S3 Bucket - L2
    const myL2Bucket = new Bucket(this, "MyL2Bucket", {
      lifecycleRules: [{ expiration: cdk.Duration.days(1) }],
    });

    new cdk.CfnOutput(this, "MyL2BucketName", { value: myL2Bucket.bucketName });

    //Create an S3 Bucket - L3
    new L3Bucket(this, "MyL3Bucket", 1);
  }
}
