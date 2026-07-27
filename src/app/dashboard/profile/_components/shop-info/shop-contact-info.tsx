import { InboxIcon } from "@/src/shared/constants/icons/inbox-icon";
import { LocationIcon } from "@/src/shared/constants/icons/location-icon";
import { PhoneCallIcon } from "@/src/shared/constants/icons/phone-call-icon";
import { Text } from "@/src/shared/ui";

interface Props {
  phone: string;
  address: string;
  email: string;
}

export function ShopContactInfo({ phone, address, email }: Props) {
  return (
    <div className="gap-layout flex flex-col">
      <div className="gap-layout flex items-center">
        <PhoneCallIcon color="text-danger" size="md" />
        <Text text={phone} />
      </div>

      <div className="gap-layout flex items-center">
        <LocationIcon color="text-danger" size="md" />
        <Text text={address} />
      </div>

      <div className="gap-layout flex items-center">
        <InboxIcon color="text-danger" size="md" />
        <Text text={email} />
      </div>
    </div>
  );
}
