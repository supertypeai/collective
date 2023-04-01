import { useContext, useCallback } from 'react';
import WpArticles from "../WpArticles"
import StackAndAffiliations from './StackAndAffiliations';
import GitHubProjects from './GitHubProjects';
import ContactCard from './ContactCard';
import RepoTags from './RepoTags';
import EnquiryModal from './EnquiryModal';
import CommitPolar from './CommitPolar';

import { MeContext } from '@/contexts/MeContext';

const Body = ({ stack, affiliations, children }) => {

    const data = useContext(MeContext);

    const autoColumnLayout = useCallback(
        (data, div) => {

            const innerContent = (
                <>
                    {data['show_repo'] > 0 &&
                        <GitHubProjects repos={data['superinference']['stats']['top_repo_stars_forks']} count={data['show_repo']} owner={data["github_handle"]} />
                    }
                    {
                        (data['superinference']['contribution']['self_contribution_to_external'] &&
                            Object.entries(data['superinference']['contribution']['self_contribution_to_external']).length > 0) &&
                        <RepoTags collaborations={data['superinference']['contribution']['self_contribution_to_external']} />
                    }
                    <ContactCard data={data} />
                    {
                        Object.values(data['superinference']['activity']['commit_count_per_month'])
                            .reduce((acc, x) => acc + x[0], 0) > 0 &&
                        <CommitPolar data={data['superinference']['activity']['commit_count_per_month']} newCol={
                            data['show_repo'] === 0
                        } />
                    }


                </>
            )

            if (div) return (
                <div className='grid grid-cols-12 bg-black bg-opacity-30 grid-rows-3 md:grid-flow-col gap-x-4'>
                    {innerContent}
                </div>
            )

            return (
                <div className="col-span-12 lg:col-span-4 text-white my-8 mx-1 self-start">
                    {innerContent}
                </div>
            )
        }, []
    )


    if (data['wp']) {

        return (
            <>
                <div className="grid grid-cols-12 items-center grid-flow gap-4 bg-black bg-opacity-30 px-2 sm:px-4 lg:px-8 auto-rows-max">
                    <div className="col-span-12 text-white lg:col-span-4 justify-center justify-self-center lg:justify-self-start mt-8">
                        <WpArticles wp_data={data['wp']} />
                    </div>
                    <StackAndAffiliations stack={stack} affiliations={affiliations} />
                </div>

                {/* when true, this moves each section to its own div */}
                {autoColumnLayout(data, true)}
                <EnquiryModal>
                    <h3 className="font-bold text-lg">We&apos;re working on this functionality.</h3>
                    <p className="py-4">The enquiry feature will be added soon.</p>
                </EnquiryModal>
            </>
        )
    } else {
        return (
            <div className="grid grid-cols-12 items-center grid-flow gap-4 bg-black bg-opacity-30 px-2 sm:px-4 lg:px-8 rounded-b-none auto-rows-max">
                <StackAndAffiliations stack={stack} affiliations={affiliations} />
                {autoColumnLayout(data, false)}
                <EnquiryModal>
                    <h3 className="font-bold text-lg">We&apos;re working on this functionality.</h3>
                    <p className="py-4">The enquiry feature will be added soon.</p>
                </EnquiryModal>
            </div>
        )
    }

}

export default Body