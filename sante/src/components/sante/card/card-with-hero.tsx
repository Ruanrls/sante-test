import Card from "./card";
import { CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

type Props = {
  image: {
    src: string;
    alt: string;
  };
  title: string | React.ReactNode;
  content: React.ReactNode;
  footer: React.ReactNode;
};

export const CardWithHero = ({ image, title, content, footer }: Props) => {
  return (
    <Card
      header={
        <>
          <div className="relative aspect-auto h-48 w-full">
            <Image
              alt={image.alt}
              src={image.src}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>

          <CardHeader>
            <CardTitle className="truncate">{title}</CardTitle>
          </CardHeader>
        </>
      }
      content={content}
      footer={<CardFooter className="flex w-full gap-x-4">{footer}</CardFooter>}
    ></Card>
  );
};
