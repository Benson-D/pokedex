/** Controls the column width of table
 * 
 * Props: 
 *      width: array [25, 25, ...]
 * State: none
 * 
 */
function ColGroup({ widths = []}: { widths: number[]}) {
  return (
    <colgroup>
        {widths.map((value, index) => (
            <col key={index} style={{ width: `${value}%`}}></col>
        ))}
    </colgroup>
  )
};

export default ColGroup; 
