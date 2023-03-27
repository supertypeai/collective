import { useContext, useCallback } from 'react';
import WpArticles from "../WpArticles"
import StackAndAffiliations from './StackAndAffiliations';
import GitHubProjects from './GitHubProjects';
import ContactCard from './ContactCard';
import RepoTags from './RepoTags';
import EnquiryModal from './EnquiryModal';

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
                    {data['superinference']['closest_user']['collaboration_count'] &&
                        <RepoTags collaborations={data['superinference']['closest_user']['collaboration_count']} />
                    }
                    <ContactCard data={data} />
                </>
            )

            if (div) return innerContent

            return (
                <div className="col-span-12 md:col-span-4 text-white my-8 mx-1 self-start">
                    {innerContent}
                </div>
            )
        }, []
    )


    if (data['wp']) {

        return (
            <>
                <div className="col-span-12 text-white lg:col-span-4 justify-center justify-self-center lg:justify-self-start mt-8">
                    <WpArticles wp_data={data['wp']} />
                </div>
                <StackAndAffiliations stack={stack} affiliations={affiliations} />
                {/* when true, this moves each section to its own div */}
                {autoColumnLayout(data, true)}
                <EnquiryModal data={data} />
            </>
        )
    } else {
        return (
            <>
                <StackAndAffiliations stack={stack} affiliations={affiliations} />
                {autoColumnLayout(data, false)}
                <EnquiryModal data={data} />
            </>
        )
    }

}

export default Body