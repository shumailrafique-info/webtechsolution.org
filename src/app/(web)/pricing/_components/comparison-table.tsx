import { CheckIcon, MinusIcon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { COMPARISON, PLANS } from "./data";

export function ComparisonTable() {
  return (
    <div className="reveal overflow-x-auto rounded-[24px] border border-neutral-200 bg-white">
      <table className="w-full min-w-160 border-collapse text-left">
        <caption className="sr-only">What each plan includes</caption>
        <thead>
          <tr className="border-b border-neutral-200">
            <th
              scope="col"
              className="w-[34%] px-6 py-5 text-[13px] font-semibold text-neutral-500"
            >
              Included
            </th>
            {PLANS.map((plan, index) => (
              <th
                key={plan.id}
                scope="col"
                className={cn(
                  "px-4 py-5 align-bottom",
                  index === 1 && "bg-primary/6",
                )}
              >
                <span className="block font-display text-[16px] leading-tight font-bold tracking-[-0.02em] text-heading">
                  {plan.name}
                </span>
                <span className="mt-1 block text-[13.5px] font-medium text-brand-deep">
                  {plan.price}
                  {plan.unit}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARISON.map((row) => (
            <tr
              key={row.label}
              className="border-b border-neutral-100 last:border-0"
            >
              <th
                scope="row"
                className="px-6 py-3.5 text-[14.5px] font-medium text-neutral-700"
              >
                {row.label}
              </th>
              {row.values.map((value, index) => (
                <td
                  key={PLANS[index].id}
                  className={cn(
                    "px-4 py-3.5 text-[14.5px] text-heading",
                    index === 1 && "bg-primary/6",
                  )}
                >
                  {value === true ? (
                    <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary/10 text-brand-deep">
                      <CheckIcon aria-label="Included" className="size-3.5" />
                    </span>
                  ) : value === false ? (
                    <MinusIcon
                      aria-label="Not included"
                      className="size-4 text-neutral-300"
                    />
                  ) : (
                    <span className="font-medium">{value}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
