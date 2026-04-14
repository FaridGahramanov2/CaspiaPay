export default function EndpointBlock({ method, path }) {
  const methodColors = {
    GET: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    POST: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
    PUT: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400',
    DELETE: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 font-mono my-4">
      <span className={`px-2 py-1 rounded text-xs font-semibold ${methodColors[method]}`}>
        {method}
      </span>
      <span className="text-gray-900 dark:text-gray-100">{path}</span>
    </div>
  );
}
