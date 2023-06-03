import { GrNext, GrPrevious } from "react-icons/gr";
type Props = {
  quantity: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  quantity,
  pageSize,
  currentPage,
  onPageChange,
}: Props) => {
  const pagesCount = Math.ceil(quantity / pageSize);

  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);
  return pagesCount > 1 ? (
    <div className="mt-4 flex justify-center items-center absolute bottom-1/4 left-1/2 -translate-x-1/2">
      <button
        className={
          "px-3 py-2 bg-gray-200 rounded-md mr-2 " +
          (currentPage === 1 ? "opacity-40" : " hover:bg-gray-300")
        }
        disabled={currentPage === 1}
        onClick={() => {
          onPageChange(currentPage - 1);
        }}
      >
        <GrPrevious className="inline" />
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={
            "px-3 py-2 hover:bg-gray-300 rounded-md mr-2 " +
            (page == currentPage ? "bg-blue-400 text-white" : "bg-gray-200")
          }
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className={
          "px-3 py-2 bg-gray-200 rounded-md mr-2 " +
          (currentPage === pagesCount ? "opacity-40" : "hover:bg-gray-300")
        }
        disabled={currentPage === pagesCount}
        onClick={() => {
          onPageChange(currentPage + 1);
        }}
      >
        <GrNext className="inline" />
      </button>
    </div>
  ) : (
    <></>
  );
};

export default Pagination;
