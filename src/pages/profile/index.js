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
import ProfileExecutive from "@/components/ProfileExecutive";

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

    const [state, setState] = useState();
    const [edit, setEdit] = useState(providerToken ? true : false);
    const [isLoading, setIsLoading] = useState(true);
    const [profileType, setProfileType] = useState("github");

    const fetchData = async (userID) => {
        const queryClient = new QueryClient();
        const data = await queryClient.fetchQuery(['profileData', userID], async () => {
            const { data, error } = await supabase
                .from('profile')
                .select()
                .eq('auth_uuid', userID)
                .single();

            if (!data) {
                throw new Error('No such user in the database');
            }
        
            if (error) {
                console.log(error);
                throw new Error(error, 'Error fetching this user');
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
        const fetchGithubAsync = async () => {
          try {
            const data = await fetchData(isLoggedIn?.githubUser?.id);
            setState(data)
            setIsLoading(false);
          } catch (error) {
            console.log(error);
          }
        };

        const fetchLinkedinAsync = async () => {
            try {
              const data = await fetchData(isLoggedIn?.linkedinUser?.id);
              setState(data)
              setIsLoading(false);
            } catch (error) {
              console.log(error);
            }
        };
      
        if(isLoggedIn?.githubUser?.id){
            setIsLoading(true);
            setProfileType("github");
            fetchGithubAsync();
        } else if (isLoggedIn?.linkedinUser?.id) {
            setIsLoading(true);
            setProfileType("linkedin");
            fetchLinkedinAsync();
        } else {
            setIsLoading(false);
        }
    }, [isLoggedIn]);

    if(isLoading) { 
        return (<div className="min-h-screen mt-2">Loading...</div>)
    } else if (!state) {
        return (<div className="min-h-screen mt-2">You haven't created your profile page.</div>)
    } else if (!state.accepted) {
        return (<div className="min-h-screen mt-2">Your profile is currently under review.</div>)
    } 

    if(profileType === "github"){
        return (
            <ProfileContext.Provider value={{ f: [state, setState] }}>
                <FormBlock
                    currentStep={formStep}
                    prevFormStep={prevFormStep}
                    profile={true}
                >
                    {formStep === 0 && (
                        <ProfilePersonalDetails nextFormStep={nextFormStep} />
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
    } else {
        return (
            <ProfileContext.Provider value={{ f: [state, setState] }}>
                <ProfileExecutive />
            </ProfileContext.Provider>
        )
    }
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