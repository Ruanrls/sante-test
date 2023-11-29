type Props = {
  children: string;
};

export const Title = ({ children }: Props) => {
  return <h1 className="text-4xl font-bold">{children}</h1>;
};
