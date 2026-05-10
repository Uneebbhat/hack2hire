type ProfileHeaderProps = {
  title: string;
  description: string;
};

export default function ProfileHeader({
  title,
  description,
}: ProfileHeaderProps) {
  return (
    <section>
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="mt-2 text-lg text-muted-foreground">{description}</p>
    </section>
  );
}
