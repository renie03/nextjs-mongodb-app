const Loading = () => {
  return (
    <div className="bg-bgSoft p-5 rounded-xl h-200 flex flex-col justify-between animate-pulse">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="h-8 w-55 bg-bg rounded-2xl" />
          <div className="h-8 w-16 bg-bg rounded-md" />
        </div>

        {/* Table Skeleton */}
        <table className="w-full border-separate border-spacing-3">
          <thead>
            <tr>
              <th>
                <div className="h-5 w-25 bg-bg rounded" />
              </th>
              <th className="hidden xl:table-cell">
                <div className="h-5 w-25 bg-bg rounded" />
              </th>
              <th className="hidden lg:table-cell">
                <div className="h-5 w-25 bg-bg rounded" />
              </th>
              <th className="hidden lg:table-cell">
                <div className="h-5 w-25 bg-bg rounded" />
              </th>
              <th className="hidden md:table-cell">
                <div className="h-5 w-25 bg-bg rounded" />
              </th>
              <th>
                <div className="h-5 w-25 bg-bg rounded" />
              </th>
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 12 }).map((_, i) => (
              <tr key={i}>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 bg-bg rounded-full" />
                    <div className="h-5 w-20 bg-bg rounded" />
                  </div>
                </td>
                <td className="hidden xl:table-cell">
                  <div className="h-5 w-25 bg-bg rounded" />
                </td>
                <td className="hidden lg:table-cell">
                  <div className="h-5 w-35 bg-bg rounded" />
                </td>
                <td className="hidden lg:table-cell">
                  <div className="h-5 w-25 bg-bg rounded" />
                </td>
                <td className="hidden md:table-cell">
                  <div className="h-5 w-25 bg-bg rounded" />
                </td>
                <td>
                  <div className="flex gap-2">
                    <div className="h-8 w-16 bg-bg rounded-md" />
                    <div className="h-8 w-16 bg-bg rounded-md" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Skeleton */}
      <div className="flex items-center justify-between gap-1 mt-2">
        <div className="h-8 w-12 bg-bg rounded-md" />
        <div className="flex items-center gap-1">
          <div className="h-8 w-8 bg-bg rounded-md" />
          <div className="h-8 w-8 bg-bg rounded-md" />
          <div className="h-8 w-8 bg-bg rounded-md" />
        </div>
        <div className="h-8 w-12 bg-bg rounded-md" />
      </div>
    </div>
  );
};

export default Loading;
