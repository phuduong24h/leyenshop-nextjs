import { useCallback, useRef } from 'react';

const LazyLoad = ({ onLoadMore, isLoading, hasNextPage }) => {
  const observer = useRef();

  const lastElementRef = useCallback(
    node => {
      if (isLoading || !hasNextPage) return;
      if (observer.current) observer.current.disconnect();
      // eslint-disable-next-line no-undef
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasNextPage, onLoadMore]
  );

  return (
    <div className="flex items-center justify-center">
      <div ref={lastElementRef} />
      {isLoading && (
        <div className="loader my-5 size-6 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
      )}
    </div>
  );
};

export default LazyLoad;
