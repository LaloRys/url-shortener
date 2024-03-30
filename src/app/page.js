/* eslint-disable react-hooks/exhaustive-deps */
import { ShortenUrl } from '@/components/component/shorten-url'

function Home() {
  
  return (
    <>
      <ShortenUrl/>
    </>
    // <div className="grid grid-cols-1 gap-6 ">
    //   <h1>URL Shortener</h1>
    //   <div className="flex flex-col items-center justify-center gap-y-4">
    //     <h2>Create a short url</h2>
    //     <input
    //       className="border-2 border-black text-black rounded-lg h-10"
    //       type="text"
    //       placeholder="Enter log url"
    //       value={longUrl}
    //       onChange={(e) => setLongUrl(e.target.value)}
    //     />
    //     <button
    //       onClick={onCreate}
    //       className="border border-indigo-500 bg-indigo-900 p-2 rounded-lg hover:bg-indigo-700"
    //     >
    //       Make it short
    //     </button>
    //     <button
    //       onClick={generateQR}
    //       className="border border-indigo-500 bg-indigo-900 p-2 rounded-lg hover:bg-indigo-700"
    //     >
    //       Get generateQR
    //     </button>
    //     <button
    //       onClick={notify}
    //       className="border border-indigo-500 bg-indigo-900 p-2 rounded-lg hover:bg-indigo-700"
    //     >
    //       Notify
    //     </button>
    //   </div>
    //   <div className="flex items-center justify-center overflow-x-auto shadow-md sm:rounded-lg">
    //     <table className="min-w-11 divide-y divide-gray-200">
    //       <thead className="bg-slate-800">
    //         <tr>
    //           <th
    //             scope="col"
    //             className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
    //           >
    //             Short url
    //           </th>
    //           <th
    //             scope="col"
    //             className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
    //           >
    //             Original url
    //           </th>
    //         </tr>
    //       </thead>
    //       <tbody className="bg-slate-600 divide-y divide-gray-200">
    //         {Object.keys(links).map((short) => {
    //           const long = links[short]

    //           return (
    //             <tr key={short} className="hover:bg-gray-700 cursor-pointer">
    //               <td
    //                 className="px-6 py-4 whitespace-nowrap"
    //                 onClick={() => onShortUrlClick(short)}
    //               >
    //                 {`${baseURL}/go/${short}`}
    //               </td>
    //               <td className="px-6 py-4 whitespace-nowrap">{long}</td>
    //             </tr>
    //           )
    //         })}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
  )
}

export default Home
