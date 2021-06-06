import { MemberTypePackageData } from './../package/package';
import { SubscriptionType } from '../subscription-type/subscription-type';
import { MemberType } from '../member/member-type';
export interface DialogData {
   dialogType: string;
   member?: MemberType[];
   subscriptionType?: SubscriptionType[];
   memberTypePackageData?: MemberTypePackageData;
}

