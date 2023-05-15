export type TypeHandlePriority<T extends { priority: number }> = {
  data: T;
  setData: (data: T) => void;
};

export const handlePriority = <T extends { priority: number }>({
  data,
  setData,
}: TypeHandlePriority<T>) =>
  setData({
    ...data,
    priority: data.priority === 3 ? 1 : data.priority + 1,
  });
