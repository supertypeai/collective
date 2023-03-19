import { Mainframe } from '@/blocks/Mainframe'
import Toprow from '@/blocks/Toprow'
import Body from '@/blocks/Body'
import IconRow from '@/blocks/IconRow'
import Affiliations from '@/blocks/Affiliations'
import { Stack, StackSection } from '@/blocks/Stack'
import { inferFromGithub } from "superinference";

import me from '@/data/profiles/samuel.json'

export async function getStaticProps() {

    if (me['github_handle']) {
        const res_gh = await fetch(`https://api.github.com/users/${me['github_handle']}`);
        const github_data = await res_gh.json();
        me['gh'] = github_data

        await inferFromGithub({
            githubHandle: me['github_handle'],
            token: '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',
            top_repo_n: 5
        }).then(
            (data) => {
                me['gh2'] = data
            }
        )

    }

    if (me['wp_blog_root_url'] && me['wp_blog_author_id']) {
        const res_wp = await fetch(`${me['wp_blog_root_url']}/wp-json/wp/v2/posts?per_page=6&author=${me['wp_blog_author_id']}&categories=4&5`);
        const wp_data = await res_wp.json();
        me['wp'] = wp_data
    }

    return {
        props: {
            data: me
        },
    }
}

const MyStack = () => {
    return (
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
    )
}

const Profile = ({ data }) => {

    return (
        <Mainframe data={data}>
            <Toprow>
                Hire me to work on your analytics backend, <b>operationlize</b> your data science models,
                or architect your <b>end-to-end machine learning pipelines.</b>
            </Toprow>
            <Body stack={<MyStack />} affiliations={<Affiliations />}>
                <div className='hidden'>
                    {JSON.stringify(data['gh2'])}
                </div>
            </Body>
        </Mainframe>
    )
}

export default Profile