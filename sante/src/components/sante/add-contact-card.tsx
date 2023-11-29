import { UserRoundPlus } from "lucide-react";
import { CardOnlyContent } from "./card";

export const AddContactCard = () => {
  return (
    <CardOnlyContent>
      <div className="flex h-full min-h-[400px] items-center justify-center">
        <UserRoundPlus width={44} height={44} />
      </div>
    </CardOnlyContent>
  );
};
