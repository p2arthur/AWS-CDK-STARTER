import * as cdk from "aws-cdk-lib";
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class PhotosStack extends cdk.Stack {
  private stackSufix: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.intializeSufix();

    new Bucket(this, "PhotosBucket2", {
      bucketName: `photos-bucket-${this.stackSufix}`,
    });
  }

  private intializeSufix() {
    const shortStackId = cdk.Fn.select(2, cdk.Fn.split("/", this.stackId));
    this.stackSufix = cdk.Fn.select(4, cdk.Fn.split("-", shortStackId));
  }
}
