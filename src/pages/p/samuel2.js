import Home from '@/icons/Home'

import { Mainframe } from '@/blocks/Mainframe'
import Toprow from '@/blocks/Toprow'
import Body from '@/blocks/Body'

import { PROFILES } from '@/data/profiles'

const me = PROFILES['samuel']

export async function getStaticProps() {

    // need to get (1) github data and (2) wordpress articles
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
        <Mainframe>
            <Toprow data={data}>
                Hire me to work on your analytics backend, <b>operationlize</b> your data science models,
                or architect your <b>end-to-end machine learning pipelines.</b>
            </Toprow>
            <Body data={data} />
        </Mainframe>
    )
}

export default Samuel