type ContainerProps = {
  children: React.ReactNode;
  className: string;
};

export default function Container({ children, className}: ContainerProps) {
  return <div className={`container max-w-2xl m-auto px-4 ${className ?? ''}`}>{children}</div>;
}
