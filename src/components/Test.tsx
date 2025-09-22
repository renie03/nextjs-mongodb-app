const Test = ({
  page,
  category,
  sort,
  q,
}: {
  page: number;
  category: string;
  sort: string;
  q: string;
}) => {
  console.log("test component", page, category, sort, q);

  return <div>Test</div>;
};

export default Test;
