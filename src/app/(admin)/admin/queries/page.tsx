import { QueriesList } from "./_components/queries-list";

const Page = () => {
  return (
    <div className="grid gap-5 p-5">
      <header>
        <h1 className="text-[22px] font-semibold tracking-tight text-foreground">
          Contact Queries
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Messages sent from the form on the contact page.
        </p>
      </header>

      <QueriesList />
    </div>
  );
};

export default Page;
