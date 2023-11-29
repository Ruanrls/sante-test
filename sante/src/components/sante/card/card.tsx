import { Card, CardContent } from "@/components/ui/card";

type Props = {
  header?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
};

const DefaultCard = ({ content, header, footer }: Props) => {
  return (
    <Card className="flex h-full min-w-[240px] max-w-[320px] flex-1 flex-col shadow-xl">
      {header}
      <CardContent className="flex flex-1 flex-col gap-4">
        {content}
      </CardContent>
      {footer}
    </Card>
  );
};

export default DefaultCard;
