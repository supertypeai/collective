import { useState, useContext, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { QueryClient } from '@tanstack/react-query';
import { useRouter } from "next/router";

import { AppContext } from "@/contexts/AppContext";
import { ProfileContext } from "@/contexts/ProfileContext";

import { Mainframe } from "@/blocks/Mainframe";
import FormBlock from "@/blocks/Form/FormBlock";
import ProfilePersonalDetails from "@/components/ProfilePersonalDetails";
import ProfileStackDetails from "@/components/ProfileStackDetails";
import ProfileAffiliationDetails from "@/components/ProfileAffiliationDetails";
import ProfileMiscellaneousDetails from "@/components/ProfileMiscellaneousDetails";

const ProfileForm = () => {

    const router = useRouter();
    const { asPath } = router;

    // Extract query parameters from URL path
    const params = new URLSearchParams(asPath);
    const providerToken = params.get('provider_token');

    const [formStep, setFormStep] = useState(providerToken ? 3 : 0);

    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

    const { isLoggedIn } = useContext(AppContext);

    const [state, setState] = useState({});
    const [edit, setEdit] = useState(providerToken ? true : false);

    const fetchData = async (userID) => {
        const queryClient = new QueryClient();
        const data = await queryClient.fetchQuery(['profileData', userID], async () => {
            const { data, error } = await supabase
                .from('profile')
                .select()
                .eq('auth_uuid', userID)
                .single();
        
            if (error) {
                console.log(error);
                throw new Error(error, 'Error fetching this user');
            }
        
            if (!data) {
                throw new Error('No such user in the database');
            }

            if (data && data['wp_blog_root_url'] && data['wp_blog_author_id']) {
                let url = '';
                // check if this root url is numeric or not
        
                if (!data['wp_blog_root_url'].includes('.')) {
                    url = `https://public-api.wordpress.com/rest/v1.1/sites/${data['wp_blog_root_url']}/posts?author=${data['wp_blog_author_id']}&number=5&fields=id,link,title,date,excerpt`
                    const res_wp = await fetch(url)
                    const wp_data = await res_wp.json();
                    data['wp'] = wp_data['posts']
                } else {
                    url = `${data['wp_blog_root_url']}/wp-json/wp/v2/posts?per_page=5&&author=${data['wp_blog_author_id']}&_fields=id,link,title,date,excerpt`
                    const res_wp = await fetch(url)
                    const wp_data = await res_wp.json();
                    data['wp'] = wp_data
                }
            }
            return data;
            }, 
            {
                staleTime: 1000 * 60 * 60 * 24, // 24 hours
                retry: false, // Disable retries on error
            }
        );
      
        return data;
    };

    useEffect(() => {
        const fetchDataAsync = async () => {
          try {
            const data = await fetchData(isLoggedIn?.githubUser?.id);
            setState(data)
          } catch (error) {
            console.log(error);
          }
        };
      
        if(isLoggedIn){
            fetchDataAsync();
        }
    }, [isLoggedIn]);

    if (Object.keys(state).length === 0) return (<div className="min-h-screen">loading...</div>)
    return (
        <ProfileContext.Provider value={{ f: [state, setState] }}>
            <FormBlock
                currentStep={formStep}
                prevFormStep={prevFormStep}
                profile={true}
            >
                {formStep === 0 && (
                    <ProfilePersonalDetails nextFormStep={nextFormStep} profile={true}/>
                )}
                {formStep === 1 && (
                    <ProfileStackDetails formStep={formStep} nextFormStep={nextFormStep} />
                )}
                {formStep === 2 && (
                    <ProfileAffiliationDetails formStep={formStep} nextFormStep={nextFormStep} />
                )}

                {formStep === 3 && <ProfileMiscellaneousDetails edit={edit} setEdit={setEdit}/>}
            </FormBlock>
        </ProfileContext.Provider>
    )
}


const Page = () => {
    return (
        <Mainframe title="Profile | Supertype Collective">
            <h1 className="text-4xl font-bold">Profile</h1>
            <ProfileForm />
        </Mainframe>
    );
}

export default Page