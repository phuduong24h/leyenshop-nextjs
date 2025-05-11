import { Loading } from 'components/form';
import { cn } from 'utils';

interface ILoadMoreButton {
  hasNextPage: boolean;
  isFetching: boolean;
  isLoading?: boolean;
  onClick: () => void;
  className?: string;
}

const LoadMoreButton = ({ hasNextPage, isFetching, isLoading, onClick, className }: ILoadMoreButton) => {
  if (!hasNextPage) {
    return null;
  }

  return (
    <div className="my-4 flex w-full justify-center">
      {isFetching || isLoading ? (
        <Loading />
      ) : (
        <button type="button" onClick={onClick} className={cn('px-4 py-1.5 text-base font-bold underline', className)}>
          Xem thêm
        </button>
      )}
    </div>
  );
};

export default LoadMoreButton;
