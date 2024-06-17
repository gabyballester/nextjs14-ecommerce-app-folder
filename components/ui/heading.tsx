import { FC } from "react";

interface Props {
  title: string;
  description: string;
}

const Heading: FC<Props> = ({ title, description }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export { Heading };
