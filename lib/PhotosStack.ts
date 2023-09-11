import * as cdk from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class PhotosStack extends cdk.Stack {
  private stackSufix: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.intializeSufix();

    const photosBucket = new Bucket(this, "PhotosBucket2", {
      bucketName: `photos-bucket-${this.stackSufix}`,
    });

    new cdk.CfnOutput(this, "photos-bucket", {
      value: photosBucket.bucketArn,
      exportName: "photos-bucket",
    });
  }

  private intializeSufix() {
    const shortStackId = cdk.Fn.select(2, cdk.Fn.split("/", this.stackId));
    this.stackSufix = cdk.Fn.select(4, cdk.Fn.split("-", shortStackId));
  }
}
