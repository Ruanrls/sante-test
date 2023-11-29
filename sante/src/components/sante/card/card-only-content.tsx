import Card from "./card";
import { CardContent } from "@/components/ui/card";

type Props = {
  children: React.ReactNode;
};

export const CardOnlyContent = ({ children }: Props) => {
  return (
    <Card
      content={
        <CardContent className="flex h-full flex-col gap-4">
          {children}
        </CardContent>
      }
    />
  );
};
