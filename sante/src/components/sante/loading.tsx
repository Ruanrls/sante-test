type LoadingProps = {
  isLoading: boolean;
  children: React.ReactNode;
  fallback: React.ReactNode | string;
};

export const Loading = ({ isLoading, children, fallback }: LoadingProps) => {
  return isLoading ? fallback : children;
};
