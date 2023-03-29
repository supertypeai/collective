import { useCallback } from 'react';
import sortByMonthName from '@/utils/sortByMonthName';
import GithubMonthlyCommit from '../Viz/GithubMonthlyCommit';

const CommitPolar = ({ data, newCol }) => {

    const getCommitCountByMonthLogged = useCallback(() => {
        const sortedMonthName = sortByMonthName(Object.keys(data), true)
        const sortedMonthCountLast12 = sortedMonthName.map(monthName => data[monthName][0])
        // combine the two above into an object
        const commit_count_by_month = sortedMonthName.map(
            (monthName, index) => ({
                x: monthName,
                y: Math.max(0, Math.log(sortedMonthCountLast12[index])),
                label: sortedMonthCountLast12[index]
            })
        )
        return commit_count_by_month
    }, [data])

    const innerContent = (
        <>
            <h3 className="text-lg uppercase font-semibold leading-normal mb-2 my-4">Last 12 Months</h3>
            <p className="text-xs text-gray-400">Number of public contributions on GitHub</p>
            <div className='max-w-xs'>
                <GithubMonthlyCommit data={getCommitCountByMonthLogged()} />
            </div>
        </>
    )

    if (!newCol) return (
        <div className='col-span-12 row-span-2 md:col-span-4 text-white my-8 mx-1 self-start'>
            {innerContent}
        </div>
    )

    return (
        <div className="col-span-12 row-span-3 md:col-span-4 text-white my-8 mx-1 self-start">
            {innerContent}
        </div>
    )

}

export default CommitPolar