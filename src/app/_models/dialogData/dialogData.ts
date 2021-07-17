import { TransportMode } from 'src/app/_models/transport-mode/transport-mode';
import { MemberTypePackageData } from './../package/package';
import { SubscriptionType } from '../subscription-type/subscription-type';
import { MemberType } from '../member/member-type';
export interface DialogData {
   dialogType: string;
   member?: MemberType[];
   modeData?: TransportMode[];
   subscriptionType?: SubscriptionType[];
   memberTypePackageData?: MemberTypePackageData;
}

