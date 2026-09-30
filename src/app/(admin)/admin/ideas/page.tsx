import { IdeasList } from "./_components/ideas-list";

const Page = () => {
  return (
    <div className="grid gap-5">
      <header>
        <h1 className="text-[22px] font-semibold tracking-tight text-foreground">
          Ideas
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Suggestions readers sent from the box beside a blog post.
        </p>
      </header>

      <IdeasList />
    </div>
  );
};

export default Page;
