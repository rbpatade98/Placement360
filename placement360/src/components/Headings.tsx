interface HeadingsProps {
  title: string;
  description?: string;
  isSubHeading?: boolean;
}

export const Headings = ({ title, description, isSubHeading }: HeadingsProps) => {
  return (
    <div className="space-y-1">
      <h2 className={isSubHeading ? "text-xl md:text-2xl font-bold tracking-tight" : "text-2xl md:text-3xl font-bold tracking-tight"}>{title}</h2>
      {description && <p className="text-xs md:text-sm text-muted-foreground">{description}</p>}
    </div>
  );
};
