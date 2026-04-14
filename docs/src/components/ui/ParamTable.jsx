export default function ParamTable({ params }) {
  return (
    <div className="my-4 overflow-hidden border border-gray-200 dark:border-gray-800 rounded-lg">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Parameter</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Type</th>
            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Description</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
          {params.map((param, i) => (
            <tr key={i} className="bg-white dark:bg-gray-950">
              <td className="px-4 py-3">
                <code className="text-sm font-mono text-teal-600 dark:text-teal-400">
                  {param.name}
                  {param.required && <span className="text-red-500 ml-1">*</span>}
                </code>
              </td>
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 font-mono">
                {param.type}
              </td>
              <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                {param.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
