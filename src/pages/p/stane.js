// template for your Developer Profile
import { Mainframe } from '@/blocks/Mainframe'
import Toprow from '@/blocks/Toprow'
import Body from '@/blocks/Body'
import IconRow from '@/blocks/IconRow'
import Affiliations from '@/blocks/Affiliations'
import { Stack, StackSection } from '@/blocks/Stack'

import me from '@/data/profiles/stane.json'

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

const MyStack = () => {
    return (
        <Stack>
            <StackSection sectionName="Engineering">
                <IconRow tags={['gcp', 'azure', 'docker']} />
                <IconRow tags={['bash', 'github']} />
            </StackSection>
            <StackSection sectionName="AI &#38; Data">
                <IconRow tags={['python', 'r', 'sql']} />
                <IconRow tags={['numpy', 'pandas', 'sklearn']} />
                <IconRow tags={['jupyter', 'tensorflow', 'pytorch']} />
            </StackSection>
            <StackSection sectionName="Visualization">
                <IconRow tags={['tableau', 'looker']} />
            </StackSection>
        </Stack>
    )
}

const Profile = ({ data }) => {

    return (
        <Mainframe data={data}>
            <Toprow />
            <Body stack={<MyStack />} affiliations={<Affiliations />} />
        </Mainframe>
    )
}

export default Profile