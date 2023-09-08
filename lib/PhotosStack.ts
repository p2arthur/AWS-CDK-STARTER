import * as cdk from "aws-cdk-lib";
import { Bucket, CfnBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export class PhotosStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myPhotosBucket = new Bucket(this, "PhotosBucket2", {
      bucketName: "photosbucket-iiwoksjla23",
    });

    (myPhotosBucket.node.defaultChild as CfnBucket).overrideLogicalId(
      "photosbucket123332"
    );
  }
}
