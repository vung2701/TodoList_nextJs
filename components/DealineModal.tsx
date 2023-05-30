import Button from "./Button";

type Props = {
  inputDeadline: string;
  onChangeInputDeadline: (str: string) => void;
  onSaveDeadline: () => void;
  onCancelDeadline: () => void;
};

const DeadlineModal = ({
  inputDeadline,
  onChangeInputDeadline,
  onSaveDeadline,
  onCancelDeadline,
}: Props) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-white border border-gray-800 w-1/3 px-8 py-8 rounded z-10">
      <div className="w-full flex flex-col text-xl">
        <div className="my-4 flex-shrink">
          <label className="whitespace-nowrap" htmlFor="">
            Deadline Time:{" "}
          </label>
          <input
            type="date"
            className="flex-1 border border-gray-400 rounded px-2 py-2 ml-4"
            placeholder="day/month/year"
            value={inputDeadline}
            onChange={(e) => onChangeInputDeadline(e.target.value)}
          />
        </div>
      </div>
      <div className="pt-8 flex justify-end">
        <Button onClick={onSaveDeadline} className="bg-green-500">
          Add
        </Button>
        <Button onClick={onCancelDeadline} className="bg-red-500">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DeadlineModal;
