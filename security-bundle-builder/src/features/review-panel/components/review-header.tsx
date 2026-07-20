type Props = {};

export default function ReviewPanelHeader({}: Props) {
  return (
    <div className="flex flex-col gap-1 mb-2.5">
      <h2 className="text-xl font-semibold text-text leading-[100%]">
        Your security system
      </h2>
      <p className="text-sm text-text-secondary">
        Review your personalized protection system designed to keep what matters
        most safe.
      </p>
    </div>
  );
}
