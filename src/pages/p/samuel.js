import { Mainframe } from '@/blocks/Mainframe'
import Toprow from '@/blocks/Toprow'
import Body from '@/blocks/Body'
import IconRow from '@/blocks/IconRow'
import Affiliations from '@/blocks/Affiliations'
import { Stack, StackSection } from '@/blocks/Stack'

import { samuel as me } from '@/data/profiles'

export async function getStaticProps() {

    if (me['github_handle']) {
        const res_gh = await fetch(`https://api.github.com/users/${me['github_handle']}`);
        const github_data = await res_gh.json();
        console.log(github_data)
        me['gh'] = github_data
    }

    if (me['wp_blog_root_url'] && me['wp_blog_author_id']) {
        const res_wp = await fetch(`${me['wp_blog_root_url']}/wp-json/wp/v2/posts?per_page=5&author=${me['wp_blog_author_id']}&categories=4&5`);
        const wp_data = await res_wp.json();
        me['wp'] = wp_data
    }

    return {
        props: {
            data: me
        },
    }
}


const Samuel = ({ data }) => {

    return (
        // needs some navbar here to return to home
        <Mainframe data={data}>
            <Toprow>
                Hire me to work on your analytics backend, <b>operationlize</b> your data science models,
                or architect your <b>end-to-end machine learning pipelines.</b>
            </Toprow>
            <Body>
                <div className="w-full md:mr-12 md:w-1/3">
                    <Stack>
                        <StackSection sectionName="Frontend">
                            <IconRow tags={['html', 'css', 'js']} />
                            <IconRow tags={['react', 'nextjs', 'tableau']} />
                            <IconRow tags={['powerbi', 'graphql']} />
                        </StackSection>
                        <StackSection sectionName="AI &#38; Data">
                            <IconRow tags={['pytorch', 'r', 'sql']} />
                            <IconRow tags={['numpy', 'pandas', 'sklearn']} />
                            <IconRow tags={['tidyverse', 'jupyter', 'selenium']} />
                        </StackSection>
                        <StackSection sectionName="Engineering">
                            <IconRow tags={['bash', 'python', 'mysql']} />
                            <IconRow tags={['postgresql', 'django', 'solidity']} />
                            <IconRow tags={['github', 'api', 'postman']} />
                        </StackSection>
                        <StackSection sectionName="Backend">
                            <IconRow tags={['gce', 'elastic', 'prisma']} />
                            <IconRow tags={['docker', 'azure', 'heroku']} />
                        </StackSection>
                    </Stack>
                </div>
                <div className="w-full md:w-2/3">
                    <Affiliations affiliations={me['affiliations']} />
                </div>
            </Body>
        </Mainframe>
    )
}

export default Samuel